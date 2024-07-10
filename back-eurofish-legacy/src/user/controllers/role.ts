
import { Request, Response } from "express";
import { createOption, createRole, deleteRolAndOptions, getOptions, getRolesAndOptions, getRolesAndOptionsByUser, updateRoleAndOptions } from "../services/roleService";
import { httpError } from "../utils/error.handle";
import { tokenInfo } from "../utils/jwt.handle";

const getRolesUserCtrl = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token ) return httpError(res, "Token and user are required");
        const id = tokenInfo(token);
        const result = await getRolesAndOptionsByUser(id);
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

const registerRoleCtrl = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const { role } = req.body;
        if (!token || !role) return httpError(res, "Token and user are required");
        
        const id = tokenInfo(token);
        if (!id || isNaN(Number(id))) return httpError(res, "Invalid token");
        
        const result = await createRole(role, Number(id));

        res.status(result.status).send(result.data || result.message);

    } catch (error) {
      if (error instanceof Error) {
        httpError(res, error.message);
      }
    }
  }

const updateRoleCtrl = async (req: Request, res: Response) => {
    try {
        const { id, role } = req.body;
        if (!id || !role) return httpError(res, "Role owner and role are required");

        const result = await updateRoleAndOptions(role, Number(id));
        res.status(result.status).send(result.data || result.message);
        
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const deleteRoleCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) return httpError(res, "Id is required");
        const result = await deleteRolAndOptions(Number(id));
        res.status(result.status).send( result.message  );
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

const getRolesCtrl = async (req: Request, res: Response) => {
    try {
        const result = await getRolesAndOptions();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

const getOptionsCtrl = async (req: Request, res: Response) => {
    try {
        const result = await getOptions();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

const createOptionCtrl = async (req: Request, res: Response) => {
    try {
        const { option } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token || !option) return httpError(res, "Token and option are required");
        
        const id = tokenInfo(token);
        if (!id || isNaN(Number(id))) return httpError(res, "Invalid token");
        
        const result = await createOption(option, Number(id));
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

export {
    getRolesUserCtrl,
    registerRoleCtrl,
    updateRoleCtrl,
    deleteRoleCtrl,
    getRolesCtrl,
    getOptionsCtrl,
    createOptionCtrl
};