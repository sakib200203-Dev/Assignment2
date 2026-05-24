import type {Request,Response} from "express";
import { authService } from "./authentication.service";
import { sendResponse } from "../../utility/sendResponse";

const createAccount=async(req:Request,res:Response)=>{
    try {
        const result=await authService.createAccountDB(req.body);
        if(result.rows[0].role !=="contributor" || result.rows[0].role !=="maintainer"){
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "Invalid user role",
                error: "User must have the role of 'contributor' or 'maintainer'"
            });
            return;
        }
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        });

        console.log( result.rows[0])
    } catch (error:any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: "Failed to register user",
            error: error.message
        });
    }

}

export const authController={
    createAccount
}