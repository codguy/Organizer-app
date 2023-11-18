# File Organiser App

This app automatically runs and moves the files from one directory to another directory based on the file type.

## Installation

To install the app first you have to clone the project to your computer then globally install the app using the command:

```bash
npm install -g
```

And the app will be installed on your system.

> <span style="color:orange"> **Note :**</span> You should have **node** and **npm** installed on your system.
----

## Configuration

This app is need to be configured for your system. Here we have a file named `config.json` that contains the configuration for all the files and directories for those files. You can customize the configuration for your own desire. Here is how you can configure. Run the command:

```
organizer-app-config
```

It will open the config file in a text editor or in the IDE installed on your computer. The configuration for the application is very simple there will be 2 properties `directories` and `configuration`. Let me explain both of them :

1. `directories` : It consistes of an array with the all the paths and folders you want the application to clean. For example:

```json
"directories": [
    "C:/Users/testUser/Downloads",
    "C:/Users/testUser/Desktop"
]
```

2. `configuration` : It constist of all the file extension and thier allocated directories that you want them to go. For example:

```json
"configuration": {
    "pictures": {
        "directoryPath": "C:/Users/testUser/Pictures",
        "extension": [
            "png",
            "jpg",
            "jpeg",
            "gif",
            "svg",
            "ico",
            "webp"
        ]
    },
    "music": {
        "directoryPath": "C:/Users/testUser/Music",
        "extension": [
            "mp3"
        ]
    },
    "videos": {
        "directoryPath": "C:/Users/testUser/Videos",
        "extension": [
            "mp4",
            "mkv"
        ]
    },
    "documents": {
        "directoryPath": "C:/Users/testUser/Documents",
        "extension": [
            "txt",
            "pdf",
            "doc",
            "docx",
            "xlxs"
        ]
    },
    "Compressed": {
        "directoryPath": "C:/Users/testUser/Compressed",
        "extension": [
            "rar",
            "zip",
            "7z"
        ]
    }
}
```

So, for example, if you have added a music file to your desktop or to  your download folder it will be automatically moved to the folder specified in the music property's `directoryPath` property which in here is `C:/Users/testUser/Music`. You can configure any file extension and assign any path to that specific folder.

> <span style="color:royalBlue">**INFO** :</span> There are two types of slashes: a backslash (\\) and a forward (/) slash. Make sure to use the forward slash and not the backward slash when defining the path.
----

## Running the application

Once you have install and configured the application on your system, You can run it from anywhere in the system using the terminal application like **CMD** or **PowerShell**. You just have to run the command:
```
organizer-app
```
It will run and clean the directories and files based on the configuration you specified in the `config.json` file.

This is the manual method of running this application, but you can automate this task by using the feature called **Task Scheduler** Application in the windows and make the system run the "`organizer-app`" command to make it automatic.
