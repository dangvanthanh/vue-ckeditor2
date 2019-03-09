workflow "Build, Release and Publish" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

action "Build" {
  uses = "actions/npm@master"
  args = "install"
}

action "Test" {
  uses = "actions/npm@master"
  needs = ["Build"]
  args = "build"
}

action "Tag" {
  uses = "actions/bin/filter@master\""
  needs = ["Test"]
  args = "tag"
}

action "Publish" {
  uses = "actions/npm@master"
  needs = ["Tag"]
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
  runs = "actions/npm@master"
}
