<p>
  <a href="https://www.puretimepropertypurchasing.com">
<img alt="Puretime Property Purchasing" src="./src/images/logos/logo.svg" width="200px"/>
  </a>
</p>

# Puretime Property Purchasing

Property agency website built with **Gatsby** and **TailwindCSS**.

## Live demo

Check the live site here 👉️ [https://puretimepropertypurchasing.com](https://puretimepropertypurchasing.com)

## Additional tools

I've used these tools to build this site. You can set up accounts for them and use their access keys in the environment variables.
- [Google Analytics](https://analytics.google.com/) (Analytics)
- [Google Adsense](https://ads.google.com/) (Ad Management)
- [Mailchimp](https://mailchimp.com/) (Form Management & Newsletter)
- [Contentful](https://www.contentful.com/) (Blog content)

## Getting started

1.  **Get the source code**

    Clone this repo from github using Git CLI

    ```shell
    git clone https://github.com/AX99/Puretime-Property.git
    ```

    Or use the [Gatsby CLI](https://www.npmjs.com/package/gatsby-cli)

    ```shell
    gatsby new my-gatsby-site
    https://github.com/AX99/Puretime-Property
    ```

2.  **Install the dependencies**

    If you have used Gatsby CLI, you can skip this step

    ```shell
    npm install
    ```

    or

    ```shell
    yarn install
    ```


3. **Set up environment variables**

    Environment variables are required for the site to work.
    
    Copy the `.env.example-dev` & `.env.example-prod` below to `.env.development` and `.env.production` files and fill in the values.
    
    `.env.example-dev`: 
    ```
    CONTENTFUL_SPACE_ID=
    CONTENTFUL_PREVIEW_ACCESS=
    MAILCHIMP_KEY=
    GA_TRACKING_ID=
    ADSENSE_PUBLISHER_ID=
    ```

    `.env.example-prod`: 
    ```
    CONTENTFUL_SPACE_ID=
    CONTENTFUL_DELIVERY_ACCESS=
    MAILCHIMP_KEY=
    GA_TRACKING_ID=
    ADSENSE_PUBLISHER_ID=
    ``` 



4.  **Start developing.**

    Navigate into your new site’s directory and start it up

    ```shell
    cd my-gatsby-site/
    ```

    ```shell
    npm run develop
    ```

    or

    ```shell
    yarn run develop
    ```

5.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000

## 🚀 Deploy on Gatsby Cloud

Deploy this template with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/landifydesign/inteo-gatsby-template)

Template crafted by [Landify Team](https://landify.design).
