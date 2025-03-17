import path from "path"
import fs from "fs"
import { TEMP_FOLDER_PATH } from "../data/config"

export const joinTempFolder = (filename: string) => {
    return `${path.resolve(TEMP_FOLDER_PATH, filename)}`
}

export const deleteFile = (filePath: string) => {
    fs.unlink(filePath, (err) => {
        if(err) console.log('Erro ao deletar arquivo em '+filePath);
    })
}