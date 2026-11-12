export type RepositoryLink = {
  name: string;
  url: string;
  label: string;
  displayUrl: string;
  image: string;
};

export const repositories: RepositoryLink[] = [
  {
    name: "pixivfe-Fork",
    url: "https://github.com/yunfie-twitter/pixivfe-Fork",
    label: "yunfie-twitter/pixivfe-Forkを開く",
    displayUrl: "github.com/yunfie-twitter/pixivfe-Fork",
    image:
      "https://opengraph.githubassets.com/e63b8a2f4236c10e5a2f1ae3c8c038da83b3b845bbb2f89e65808f820c84e0ba/yunfie-twitter/pixivfe-Fork"
  },
  {
    name: "inverview-server",
    url: "https://github.com/yunfie-twitter/inverview-server.git",
    label: "yunfie-twitter/inverview-serverを開く",
    displayUrl: "github.com/yunfie-twitter/inverview-server.git",
    image:
      "https://opengraph.githubassets.com/f1f65fb714b2d8f5534b0385b725b2caf0d408082c5928b2cd9689a1c4e50432/yunfie-twitter/inverview-server"
  }
];
