import {Request, Response} from "express";
import {TemplateTypes} from "../cms/util/templateTypes";
import {User} from "../models/User";

export default class SelectTemplateController {
    static setTemplate = async (req: Request, res: Response) => {
        const {templateType} = req.body;
        if (templateType === undefined) {
            return res.status(500).send({error: req.body, reason: "No template selected "});
        }

        await User.findByIdAndUpdate(req.user, {selected: templateType}, err => {
            if(err) {
                res.status(501).send({data: err});
            }
            return res.status(200).redirect("/");
        });
    };

    static getSelectTemplatePage = async (req: Request, res: Response) => {
        return res.render("cmsManagement/selectTemplate", {});
    };
}
