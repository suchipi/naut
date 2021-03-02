# naut

simpler version of shelljs

## Usage

```
const naut = require("naut");

naut.ls().forEach(file => {
  naut.mv(file, file + ".bak");
});
```

## Global Usage

```
require("naut/global");

ls().forEach(file => {
  mv(file, file + ".bak");
});
```

# API

- ls
- pwd
- cd
- rm
  - Always behaves like `-rf` is set
- mkdir
  - Always behaves like `-p` is set
- cp
  - You can pass `-R` or `-r` or `-a` to as the first argument to copy a directory instead of a file
- mv
- touch
- cat
- exec
- $ (command substitution simulator)
- echo
  - You can use `.to` and `.toEnd` like in shelljs
