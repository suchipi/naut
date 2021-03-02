const fs = require("fs");
const os = require("os");
const child_process = require("child_process");
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const cp = require("cp");
const copyDir = require("copy-dir");

module.exports = {
  ls(dir = process.cwd()) {
    return fs.readdirSync(dir);
  },
  pwd() {
    return process.cwd();
  },
  cd(newDir = os.homedir()) {
    process.chdir(newDir);
  },
  rm(...args) {
    rimraf.sync(args[args.length - 1]);
  },
  mkdir(...args) {
    mkdirp.sync(args[args.length - 1]);
  },
  cp(...args) {
    let opt = "",
      src,
      dest;
    if (args.length === 3) {
      opt = args[0];
      src = args[1];
      dest = args[2];
    } else if (args.length === 2) {
      src = args[1];
      dest = args[2];
    } else {
      throw new Error("Please specify a source and destination");
    }

    if (opt === "-r" || opt === "-R" || opt === "-a") {
      copyDir.sync(src, dest, {
        utimes: true,
        mode: true,
        cover: true,
      });
    } else {
      cp.sync(src, dest);
    }
  },
  mv(oldPath, newPath) {
    fs.renameSync(oldPath, newPath);
  },
  touch(somePath) {
    const fd = fs.openSync(somePath, "a");
    fs.closeSync(fd);
  },
  cat(somePath) {
    process.stdout.write(fs.readFileSync(somePath, "utf-8"));
  },
  exec(cmd) {
    child_process.execSync(cmd, {
      stdio: "inherit",
    });
  },
  // Command substitution
  $(cmd) {
    return child_process.execSync(cmd, {
      encoding: "utf-8",
    });
  },
  echo(str) {
    return Object.assign(str, {
      to(somePath) {
        fs.writeFileSync(somePath, str);
      },
      toEnd(somePath) {
        fs.appendFileSync(somePath, "\n" + str);
      },
    });
  },
};
