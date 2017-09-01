import React            from "react";
import GitHubForkRibbon from 'react-github-fork-ribbon'

const Fork = () => (
  <GitHubForkRibbon href="//github.com/pdhoward/books"
                    target="_blank"
                    color="green"
                    position="left-bottom">
    Fork me on GitHub
  </GitHubForkRibbon>
);


export default Fork;
