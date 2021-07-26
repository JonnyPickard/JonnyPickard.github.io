module.exports = {
  siteMetadata: {
    siteUrl: "https://jonnypickard.github.io",
    title: "jonnypickard.github.io",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    "gatsby-plugin-typescript",
  ],
};
