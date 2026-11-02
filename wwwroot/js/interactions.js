(() => {
    "use strict";

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const registered = new WeakSet();
    const pendingReveals = new Set();
    const scenes = new Set();
    let scrollFrame = 0;
    let revealObserver;
    let sceneObserver;

    function motionPaused() {
        return motionPreference.matches || document.documentElement.dataset.motion === "paused";
    }

    function reveal(element, immediate = false) {
        if (immediate) element.classList.add("reveal-immediate");
        element.classList.add("is-visible");
        pendingReveals.delete(element);
        revealObserver?.unobserve(element);
    }

    if ("IntersectionObserver" in window) {
        revealObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.target.isConnected) {
                    pendingReveals.delete(entry.target);
                    revealObserver.unobserve(entry.target);
                    continue;
                }
                if (entry.isIntersecting) reveal(entry.target, motionPaused());
            }
        }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
        sceneObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (!entry.target.isConnected) {
                    scenes.delete(entry.target);
                    entry.target.classList.remove("is-motion-visible");
                    sceneObserver.unobserve(entry.target);
                    continue;
                }
                entry.target.classList.toggle("is-motion-visible", entry.isIntersecting);
            }
        }, { threshold: 0.01 });
    }

    function registerReveal(element) {
        if (registered.has(element) && (element.classList.contains("is-visible") || pendingReveals.has(element))) return;
        registered.add(element);
        if (element.classList.contains("is-visible")) return;
        if (motionPaused() || !revealObserver || element.contains(document.activeElement)) {
            reveal(element, true);
            return;
        }
        element.classList.add("reveal-pending");
        pendingReveals.add(element);
        revealObserver.observe(element);
    }

    function registerScene(element) {
        if (scenes.has(element)) return;
        scenes.add(element);
        if (sceneObserver) sceneObserver.observe(element);
        else element.classList.add("is-motion-visible");
    }

    function registerTree(root) {
        if (!(root instanceof Element)) return;
        if (root.matches("[data-reveal]")) registerReveal(root);
        root.querySelectorAll("[data-reveal]").forEach(registerReveal);
        if (root.matches("[data-motion-scene]")) registerScene(root);
        root.querySelectorAll("[data-motion-scene]").forEach(registerScene);
    }

    function unregisterTree(root) {
        // A DOM move is still connected, so keep its once-only registration.
        if (!(root instanceof Element) || root.isConnected) return;
        function removeReveal(element) {
            pendingReveals.delete(element);
            revealObserver?.unobserve(element);
        }
        function removeScene(element) {
            scenes.delete(element);
            element.classList.remove("is-motion-visible");
            sceneObserver?.unobserve(element);
        }
        if (root.matches("[data-reveal]")) removeReveal(root);
        root.querySelectorAll("[data-reveal]").forEach(removeReveal);
        if (root.matches("[data-motion-scene]")) removeScene(root);
        root.querySelectorAll("[data-motion-scene]").forEach(removeScene);
        if (tiltTarget && root.contains(tiltTarget)) resetTilt();
    }

    function updateScroll() {
        scrollFrame = 0;
        const header = document.querySelector(".site-header");
        if (!header) return;
        const maximum = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maximum > 0 ? Math.min(1, Math.max(0, window.scrollY / maximum)) : 0;
        let active = "home";
        for (const section of document.querySelectorAll("main > section[id]")) {
            if (section.getBoundingClientRect().top <= 165) active = section.id;
        }
        header.style.setProperty("--reading-progress", progress.toFixed(4));
        for (const link of header.querySelectorAll(".desktop-nav a")) {
            if (link.hash === "#" + active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        }
    }

    function scheduleScroll() {
        if (!scrollFrame && !document.hidden) scrollFrame = window.requestAnimationFrame(updateScroll);
    }

    const mutationObserver = new MutationObserver(records => {
        let layoutChanged = false;
        // Clean up disconnected nodes first; a reused/moved node is then safe
        // to register without restarting an entrance that already completed.
        for (const record of records) {
            for (const node of record.removedNodes) unregisterTree(node);
        }
        for (const record of records) {
            for (const node of record.addedNodes) {
                registerTree(node);
                if (node instanceof Element) layoutChanged = true;
            }
            for (const node of record.removedNodes) {
                if (node instanceof Element) layoutChanged = true;
            }
        }
        if (layoutChanged) scheduleScroll();
    });

    document.addEventListener("focusin", event => {
        if (!(event.target instanceof Element)) return;
        const appearance = document.querySelector(".appearance-menu[open]");
        if (appearance && !appearance.contains(event.target)) appearance.removeAttribute("open");
        let ancestor = event.target;
        while (ancestor) {
            if (ancestor.matches("[data-reveal]")) reveal(ancestor, true);
            ancestor = ancestor.parentElement;
        }
    });

    document.addEventListener("click", event => {
        if (!(event.target instanceof Element)) return;
        const openButton = event.target.closest("[data-open-dialog]");
        if (openButton) {
            const dialog = document.getElementById(openButton.dataset.openDialog);
            if (dialog instanceof HTMLDialogElement && !dialog.open) dialog.showModal();
        }
        const closeButton = event.target.closest("[data-close-dialog]");
        if (closeButton) closeButton.closest("dialog")?.close();
        if (event.target instanceof HTMLDialogElement && event.target.open) {
            const rect = event.target.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right ||
                event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
        }
        const menu = document.querySelector(".mobile-menu[open]");
        const appearance = document.querySelector(".appearance-menu[open]");
        if (appearance && !appearance.contains(event.target)) appearance.removeAttribute("open");
        if (menu && (!menu.contains(event.target) || event.target.closest(".mobile-menu-panel a"))) {
            menu.removeAttribute("open");
        }
    });

    document.addEventListener("change", event => {
        if (!(event.target instanceof HTMLSelectElement) || !event.target.matches("[data-language-select]")) return;
        if (!["pt-BR", "en", "es"].includes(event.target.value)) return;
        const returnUrl = window.location.pathname + window.location.search + window.location.hash;
        window.location.assign("/culture?culture=" + encodeURIComponent(event.target.value) + "&returnUrl=" + encodeURIComponent(returnUrl));
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;
        const appearance = document.querySelector(".appearance-menu[open]");
        if (appearance) {
            appearance.removeAttribute("open");
            appearance.querySelector("summary")?.focus();
        }
        const menu = document.querySelector(".mobile-menu[open]");
        if (menu) {
            menu.removeAttribute("open");
            menu.querySelector("summary")?.focus();
        }
    });

    let tiltFrame = 0;
    let tiltTarget;
    let tiltX = 0;
    let tiltY = 0;

    function resetTilt() {
        if (tiltFrame) window.cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
        if (tiltTarget) {
            tiltTarget.style.removeProperty("--tilt-x");
            tiltTarget.style.removeProperty("--tilt-y");
        }
        tiltTarget = undefined;
    }

    document.addEventListener("pointermove", event => {
        if (motionPaused() || document.hidden || !finePointer.matches || !(event.target instanceof Element)) return;
        const canvas = event.target.closest("[data-tilt]");
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        if (tiltTarget && tiltTarget !== canvas) resetTilt();
        tiltTarget = canvas;
        tiltX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
        tiltY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
        if (tiltFrame) return;
        tiltFrame = window.requestAnimationFrame(() => {
            tiltFrame = 0;
            if (motionPaused() || document.hidden || !tiltTarget?.isConnected) { resetTilt(); return; }
            tiltTarget.style.setProperty("--tilt-x", (-tiltY * 2).toFixed(2) + "deg");
            tiltTarget.style.setProperty("--tilt-y", (tiltX * 3).toFixed(2) + "deg");
        });
    }, { passive: true });

    document.addEventListener("pointerout", event => {
        if (!tiltTarget || !(event.target instanceof Element)) return;
        const canvas = event.target.closest("[data-tilt]");
        if (canvas !== tiltTarget || (event.relatedTarget instanceof Node && canvas.contains(event.relatedTarget))) return;
        resetTilt();
    }, { passive: true });

    function syncMotion() {
        if (!motionPaused()) return;
        for (const element of pendingReveals) reveal(element, true);
        resetTilt();
    }

    document.addEventListener("hts:motionchange", syncMotion);
    motionPreference.addEventListener("change", syncMotion);
    finePointer.addEventListener("change", () => { if (!finePointer.matches) resetTilt(); });
    document.addEventListener("visibilitychange", () => {
        document.documentElement.dataset.pageHidden = String(document.hidden);
        if (document.hidden) {
            resetTilt();
            if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
            scrollFrame = 0;
        } else scheduleScroll();
    });

    window.hts = {
        focusInvalidForm() {
            const invalid = document.querySelector("#quote .invalid, #quote [aria-invalid='true']");
            if (invalid) {
                const field = invalid.matches("input, select, textarea") ? invalid : invalid.querySelector("input, select, textarea");
                (field || invalid).focus();
                return;
            }
            // Checkbox sets use a fieldset, rather than a Blazor InputBase.
            const group = Array.from(document.querySelectorAll("#quote .wizard-choice-group"))
                .find(element => element.querySelector(".validation-message"));
            group?.querySelector("input")?.focus();
        },
        focusWizardStep() {
            document.querySelector("#wizard-step-heading")?.focus({ preventScroll: true });
            document.querySelector("#quote .quote-panel")?.scrollIntoView({ behavior: "instant", block: "start" });
        },
        downloadBrief(text) {
            const url = URL.createObjectURL(new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = "briefing-hts.txt";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
    };

    function initialize() {
        registerTree(document.body);
        syncMotion();
        mutationObserver.observe(document.body, { childList: true, subtree: true });
        window.addEventListener("scroll", scheduleScroll, { passive: true });
        window.addEventListener("resize", scheduleScroll, { passive: true });
        if ("ResizeObserver" in window) new ResizeObserver(scheduleScroll).observe(document.body);
        scheduleScroll();
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
    else initialize();
})();
