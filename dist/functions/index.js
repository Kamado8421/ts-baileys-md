"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.joinTempFolder = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../data/config");
const joinTempFolder = (filename) => {
    return `${path_1.default.resolve(config_1.TEMP_FOLDER_PATH, filename)}`;
};
exports.joinTempFolder = joinTempFolder;
const deleteFile = (filePath) => {
    fs_1.default.unlink(filePath, (err) => {
        if (err)
            console.log('Erro ao deletar arquivo em ' + filePath);
    });
};
exports.deleteFile = deleteFile;
