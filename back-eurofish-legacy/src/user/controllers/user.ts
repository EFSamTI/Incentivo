import { Request, Response } from "express";
import { httpError } from "../utils/error.handle";
import { tokenInfo } from "../utils/jwt.handle";
import { createUser, deleteUser, getUserFoto, getUserInfoById, getUsers, updateUser } from "../services/userService";

const getUsersCtrl = async (req: Request, res: Response) => {
    try {
        const result = await getUsers();
        res.status(result.status).send(result.data || result.message);
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}

const getUserImageByIdCtrl = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return httpError(res, "Token is required");
        const id = tokenInfo(token); 
        const result = await getUserFoto(id, true);
        if (result.status === 404) {
            return res.status(404).send(result.message);
        }
        const user = result.data;
        if (!user) return httpError(res, "User not found");

        res.json({
            name: user.name,
            foto: user.foto 
        });
    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
};

const getUserInfoCtrl = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return httpError(res, "Token is required");
        const id = tokenInfo(token); 
        const result = await getUserInfoById(id);
       
        return res.status(result.status).send(result.data || result.message);

    } catch (error) {
        if (error instanceof Error) {
            httpError(res, error.message);
        }
    }
}


const registerUserCtrl = async (req: Request, res: Response) => {
    try {
      const userString = req.body.user;
      const foto = req.file; 
      const user = userString ? JSON.parse(userString) : null;

      const token = req.headers.authorization?.split(' ')[1];
      if (!token || !user) return httpError(res, "Token and user are required");
      const id = tokenInfo(token);
      if (!id || isNaN(Number(id))) return httpError(res, "Invalid token");

      const result = await createUser(user, Number(id), foto);
      res.status(result.status).send(result.data || result.message);
    } catch (error) {
      if (error instanceof Error) {
        httpError(res, error.message);
      }
    }
  };
const updateUserCtrl = async (req: Request, res: Response) => {
    try {
        const { id, user } = req.body;
        if (!id || !user) return httpError(res, "User owner and user are required");

        const result = await updateUser(user, Number(id));
        res.status(result.status).send(result.data || result.message);
        
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

const deleteUserCtrl = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        if (!id) return httpError(res, "Id is required");
        const result = await deleteUser(Number(id));
        res.status(result.status).send(result.message);
    } catch (error) {
        if (error instanceof Error) {
        httpError(res, error.message);
        }
    }
}

export { getUsersCtrl, getUserImageByIdCtrl, registerUserCtrl, updateUserCtrl, deleteUserCtrl, getUserInfoCtrl };