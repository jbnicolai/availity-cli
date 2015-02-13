Before you can deploy an application to the Availity Spaces platform, you must create the project on the Availity deployment server. Change to the directory containing your project and type:

```
availity create
```

This command does the following:

* Checks to see if this project is a Git repository, and if not, initializes it as a Git repository
* Creates a Git remote in this repository called `availity`
* Creates this project on the [Availity Git server](https://code.availity.com)

To push your code to the Availity Git server, use the `git push` command:

```
git push -u availity master
```

You run the `availity create` command only once for a given project. You run the `git push availity master` command many times -- any time you have changes you wish to deploy.

**Note:** Don't forget to commit your code to your local Git repository before pushing to the Availity Git server.

Example:

``` bash
$ cd ~/Development/MyCoolApplication
$ availity create
Created project on Availity deployment server
```

``` bash
$ availity push -u availity master
```
