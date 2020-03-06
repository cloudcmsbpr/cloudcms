"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    res.render("home", {
        title: "Home",
        user: req.user || ""
    });
};
//# sourceMappingURL=home.js.map