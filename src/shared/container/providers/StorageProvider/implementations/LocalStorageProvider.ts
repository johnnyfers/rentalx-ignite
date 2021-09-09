import { IStorageProvider } from "../IStorageProvider";
import { resolve } from 'path'

import fs from 'fs'
import Upload from "../../../../../config/Upload";
import { deleteFile } from "../../../../../utils/file";


class  LocalStorageProvider implements IStorageProvider {
    
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(Upload.tmpFolder, file),
            resolve(`${Upload.tmpFolder}/${folder}`, file)
        )

        return file
    }

    async delete(file: string, folder: string): Promise<void> {
        const fileName = resolve(`${Upload.tmpFolder}/${folder}`, file)

        deleteFile(fileName)
    }

}

export { LocalStorageProvider }