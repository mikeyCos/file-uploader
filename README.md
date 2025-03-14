<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url] -->
<!-- [![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/mikeyCos/file-uploader">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ProjectName</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://file-uploader-mikey-cos.fly.dev/">Live Preview</a>
    ·
    <a href="https://github.com/mikeyCos/file-uploader/blob/main/PROJECT_SPECIFICATIONS.md">Project Specifications</a>
    <!-- ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
    ·
    <a href="https://github.com/mikeyCos/file-uploader/blob/main/CHANGELOG.md">Changelog</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#questions">Questions</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![CV Application Screen Shot][product-screenshot]](https://example.com)

Project: ProjectName

Hello world,

Pellentesque tincidunt vel ante lobortis vehicula. Donec ex justo, volutpat nec ultricies non, elementum nec nibh. Maecenas porttitor est ac nibh congue, sed placerat lorem bibendum. Duis non ante in ex sollicitudin pulvinar nec sit amet turpis. Pellentesque ac elit sed libero vehicula convallis. Pellentesque tincidunt tellus nec lacus mollis pellentesque. Integer tempus sit amet nunc a auctor. Morbi at ullamcorper dolor, non placerat orci. Ut ut efficitur metus. In efficitur enim id sodales porta. Phasellus scelerisque, augue sit amet semper suscipit, lacus nunc laoreet lorem, sit amet elementum orci justo in risus. Ut diam est, egestas sed ligula ut, cursus dignissim nibh. Mauris in est dui. Pellentesque in sem ut dolor laoreet porta. Etiam vitae accumsan tortor. Vestibulum magna mi, sagittis eget consequat a, tincidunt in ligula.

Hard time setting up middle wares for rendering components used in a `dialog` element.

```js
setEditContent: asyncHandler(async (req, res, next) => {
  const { fileID, folderID } = req.params;
  if (fileID) {
    const file = await prisma.file.findFirst({
      where: {
        id: fileID,
      },
    });

    res.locals.form = {
      action: `/drive/file/edit/${fileID}}`,
      method: "PUT",
      class: "form-edit-file",
      label: "edit_file",
      value: file.name,
    };
  }
  if (folderID) {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
      },
    });

    res.locals.form = {
      action: `/drive/folder/edit/${folderID}}`,
      method: "PUT",
      class: "form-edit-folder",
      label: "edit_folder",
      value: folder.name,
    };
  }
  next();
})

// The next middleware
getEditForm: asyncHandler(async (req, res) => {
  res.render("editForm");
})

// versus
getEditFileForm: asyncHandler(async (req, res) => {
  const { fileID } = req.params;
  const file = await prisma.file.findFirst({
    where: {
      id: fileID,
    },
  });

  res.render("editFileForm");
})
```

To failing forward, cheers!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![JavaScript][JavaScript.js]][JavaScript-url]
[![Node][NodeJS]][NodeJS-url]
[![Express][Express.js]][Express-url]
[![EJS][EJS]][EJS-url]
[![CSS3][CSS3]][CSS3-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is a list of things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```
- PostgreSQL
  ```sh
  sudo apt install postgresql postgresql-contrib libpq-dev
  ```

### Installation

1. Create repository
    - Option 1:
      1. Go to [module-react-starter repository](https://github.com/mikeyCos/module-react-starter) on GitHub and click 'Use this template' button or click [Create a new repository](https://github.com/new?template_name=module-react-starter&template_owner=mikeyCos).
    - Option 2:
      1. Clone [module-react-starter repository](https://github.com/mikeyCos/module-react-starter) using HTTPS/SSH/GitHub CLI; [more on cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
      2. Navigate to cloned repository.
      3. Remove `.git` folder.
      4. Run `git init`.
      5. Run `git branch -M main`.
      6. Create a new repository on GitHub.
      7. Run `git remote add origin REPLACE_WITH_SSH_OR_HTTPS`.
      8. Run `git add . && git commit`.
2. Navigate to local repository and install NPM packages with `npm install`.
3. Create `.env` file in the root directory.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Create skeleton components
- [ ] Seed database
  - [ ] Create database schemas
    - [ ] Session
    - [ ] User
    - [ ] Folder
      - [ ] Folder can hold folders and files
    - [ ] File
- [ ] Create modal that will display content based on button pressed
  - [ ] Create a file upload form
    - [ ] Validate file extension
    - [ ] Validate file size
    - [ ] Validate file mimetype
    - [ ] A reference location is needed to add the file to a corresponding folder
  - [ ] Create a create folder form
    - [ ] Validate and sanitize input
  - [ ] Create a edit folder form
  - [ ] Create a edit file name form
    - [ ] The file's name
  - [ ] Create a share folder form
    - [ ] Accepts a number of days for expiration duration
  - [ ] Create a file card
    - [ ] Display the file's name, size, and when it was created
- [ ] Upload an array of files to Supabase

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/mikeyCos/cv-application](https://github.com/mikeyCos/cv-application)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Best README Template](https://github.com/othneildrew/Best-README-Template)
- []()
- []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- QUESTIONS -->

## Questions

1. Is there any situation when the options object for `multer` is required when `express-validator` is used to validate uploaded files? Specifically the [fileFilter](https://github.com/expressjs/multer/tree/master?tab=readme-ov-file#filefilter) option.
2. When is it more appropriate to validate files? Before or after send the files to the server? Is it redundant to validate the same properties in the front-end and back-end?
3. Is it bad practice to call `res.redirect()` on the sever then set `window.location = res.url` on the client? For example,
```js
// Client
// Example action value
const action = "/drive/folder/b4462c08-f57e-4196-a44c-6c18de14277b/delete";
await fetch(action, {
  method: "DELETE",
}).then((res) => {
  if (res.redirected) window.location = res.url;
});

// Server
asyncHandler(async (req, res) => {
  const { folderID } = req.params;
  await prisma.folder.delete({
    where: {
      id: folderID,
    },
  }); 
  // This is fetched from the client and causes 2 GET requests
  res.redirect("/drive");
  }),
```
4. What are situations in Node where it makes more sense to use synchronous code over asynchronous code?
5. Is it more accessible to use an `anchor` element over a `button` element to handle downloads? What are situations, if any, where it makes sense to use one over the other?
6. What are some use cases for constructing a Express route? For example, `shareRoutes.js` module exports a function that returns a `Router` object with assigned `router.METHOD` for specific paths. The function also uses a `isAuth` middleware for only the `POST` method.
```js
const shareRoutes = (isAuth) => {
  const shareRouter = new Router();

  // GET requests
  shareRouter.get("/:folderID", getSharedRoute);

  // POST requests
  shareRouter.post("/:folderID", isAuth, createSharedRoute);

  return shareRouter;
};

module.exports = shareRoutes;
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[JavaScript-url]: https://www.javascript.com/
[JavaScript.js]: https://img.shields.io/badge/javascript-20232A?style=for-the-badge&logo=javascript
[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[EJS]: https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black
[EJS-url]: https://ejs.co/
[CSS3]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://www.w3.org/TR/2001/WD-css3-roadmap-20010523/
[product-screenshot]: ./demo/media/project_screenshot_01.png

