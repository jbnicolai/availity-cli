To set up the Availity CLI for use, you must log in using your Availity credentials.

**Note:** The Availity CLI is currently in early access preview, so only certain parties have been granted Availity credentials. In the future, you will be able to register on the Availity Developer Portal to receive credentials for using the Availity CLI.

To log in, type:

```
availity login
```

After you enter your Availity credentials, the system will authenticate you. Then, it will:

* Check your system for a public SSH key
* If you don't have one, offer to create one
* Upload your public key to the Availity deployment server
* Write a configuration file to your home directory (`.availity.config.json`)

Example:

``` bash
$ availity login
User ID: xxxxxx
Password (will not display):
Logging in to Availity
Saving configuration
Uploading public key
Done!
```
