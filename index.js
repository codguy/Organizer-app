#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// laoding configuratiuon from config file to variables
const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "config.json"), "utf8")
);
const movingConfig = config.configuration;
const directoryPath = config.directories;

// this function will run automatically
(async () => {
    directoryPath.map((path) => {
        console.log(
            chalk.grey("Moving files of directory: ") + chalk.bold.green(path)
        );
        moveFilesFromDirectory(path);
    });
    console.log(chalk.green("Successfully moved files form all directories"));
})();

// Take a directory path a parameter and move all the files from that directory
function moveFilesFromDirectory(dir) {
    let allFiles = getAllFilesFromDirectory(dir);

    allFiles.map(function (file) {
        const { oldPath, newPath, fileName } = file;
        moveFileToNewDirectory(oldPath, newPath);

        console.log(chalk.bold("Moving file: " + chalk.magenta(fileName)));
    });

    console.log(chalk.yellow("Directory Cleaned"));
}

// get all the files with thier oldPath and newPath
function getAllFilesFromDirectory(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir);
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
        const name = `${dir}/${file}`;

        // Check if the current file/directory is a directory using fs.statSync
        if (fs.statSync(name).isDirectory()) {
            // If it is a directory, recursively call the getAllFilesFromDirectory function with the directory path and the files array
            console.log(
                chalk.grey("Searching Sub-directory: ") + chalk.bold.green(name)
            );
            getAllFilesFromDirectory(name, files);
            removeEmptyDirectory(name);
        } else {
            // If it is a file, push the full path to the files array
            let extension = file.split(".").pop();
            let finalPath = getNewDirectoryPath(extension);
            if (finalPath != undefined) {
                files.push({
                    oldPath: name,
                    newPath: `${finalPath}/${file}`,
                    fileName: file,
                });
            }
        }
    }
    return files;
}

function removeEmptyDirectory(directory) {
    fs.readdir(directory, function (err, files) {
        if (err) {
            console.error(err.message);
        } else {
            if (!files.length) {
                fs.rmdirSync(directory);
                console.log(
                    `${chalk.grey("Removing empty directory :")} ${chalk.red(
                        directory
                    )}`
                );
            }
        }
    });
}

// Returns the expected path for a given file according to the file extension
function getNewDirectoryPath(ext) {
    let finalPathKey = Object.keys(movingConfig).filter((key) => {
        return movingConfig[key].extension.includes(ext);
    });
    // if the path for a file extension is not specified it will not be returned
    if (finalPathKey && movingConfig[finalPathKey]) {
        let finalPath = movingConfig[finalPathKey].directoryPath;
        return finalPath;
    }
}

// move the file to new directory based on the finguration
async function moveFileToNewDirectory(oldPath, newPath) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}
