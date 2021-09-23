/* eslint-disable no-useless-return */
import fs from "fs";

export const deleteFile = async (filename: string) => {
    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }
    // remove file
    await fs.promises.unlink(filename);
};
