The `availity init` command initializes either a new or an existing project.

#### Initializing a New Project

To create a new application on your local workstation, type:

```
availity init [project-name]
```

This creates a new project in the `project-name` directory.

#### Initializing an Existing Project

If you already have a project, change to your project's directory and omit the project name from the `availity init` command. For example, if I have an existing project in the `my-project` directory, I would type:

```
cd my-project
availity init
```

#### Completing the Initialization

The Availity CLI prompts you for information about your new application, and then creates a skeleton application (or configures your existing application) tailored to your responses. The prompts it gives are:

* Enter a description for your application: 
    * The description is used in the application catalog, and can be changed later.
* Enter the version of your application: (0.1.0)
    * Availity Spaces uses [semver](http://semver.org/) for versioning. You can accept the default or type a new version.
* Use our Developer Toolkit?
    * The Availity Developer Toolkit contains various tools to make web development easier. Some of the tools it includes are:
      * The Availity UIKit
      * A build mechanism using [gulp](http://gulpjs.com)
      * Live browser reloads when your application code changes
      * A mock server for REST calls
      * LESS compilation
      * See more at [the project website](https://github.com/Availity/availity-toolkit)

Example:

``` bash
$ availity init MyCoolApplication
Enter the description for your application: A really cool application that you will love
Enter the version of your application: (0.1.0)
Use our Developer Toolkit? y

Creating project MyCoolApplication
Creating directory MyCoolApplication
Saving configuration
Installing Toolkit... [=========================] 100% 0.0s

Installing packages...
Package installation complete
Project MyCoolApplication initialized
Next Steps:
* Read documentation for Availity Toolkit (https://github.com/Availity/availity-toolkit)
* Develop your application
* Use availity create to begin deploying your application
```

#### Installing the Availity UIKit

After your project initializes, if you didn't select to use our Developer Toolkit, the Availity CLI displays instructions for how to install the Availity UIKit. Installation instructions depend on which package manager you use to manage project dependencies. Installation instructions for different package managers are:

* NPM
   `npm install --save availity-uikit`
* Bower
   `bower install --save availity-uikit`
* No Package Manager
   `git submodule add git@github.com:Availity/availity-uikit.git`

#### Changing Your Answers

The initialization process creates a file in the root of your project directory called `availity.config.json`. This file contains the information you entered, in JSON format. You can edit this file in any text editor to update your project description, et al. Take care, however, to preserve the format of the file.
