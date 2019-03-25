[back to documentation overview](../readme.md)

## Overview

| Property  | type   | default   | explanation                                    |
|-----------|--------|-----------|------------------------------------------------|
| path      | string | undefined | The path to match against the current location |
| exact     | bool   | false     | If true, only match when paths are equal       |
| strict    | bool   | false     | If true, only match if trailing slashes are identical |
| sensitive | bool   | false     | if true, only match on identical casing        |

```exact``` is implemented in alnilam. For the rest of the matching options,
you can also consult the documentation of [path-to-regexp@1.7.0](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0).

## Default

| Location        | path      | matching? |
|-----------------|-----------|-----------|
| /               | /         | true      |
| /milkyway       | /         | true      |
| /milkyway       | /milkyway | true      |
| /andromeda      | /         | true      |
| /andromeda      | /milkyway | false     |
| /milkyway/rigel | /milkyway | true      |

## sensitive

| Location  | path          | sensitive | matching? |
|-----------|---------------|-----------|-----------|
| /milkyway | /**M**ilkyway | false     | true      |
| /milkyway | /**M**ilkyway | true      | false     |

## strict

```strict``` enforces trailing slashes:

| Location   | path       | strict   | matching? |
|------------|------------|----------|-----------|
| /milkyway  | /milkyway  | false    | true      |
| /milkyway/ | /milkyway  | false    | true      |
| /milkyway  | /milkyway  | **true** | true      |
| /milkyway/ | /milkyway  | **true** | **false** |
| /milkyway/ | /milkyway/ | **true** | **true**  |

## exact

```exact``` enforces the level of the match:

| Location          | path      | exact      | matching? |
|-------------------|-----------|------------|-----------|
| /milkyway         | /milkyway | false      | true      |
| /milkyway/tauceti | /milkyway | **false**  | **true**  |
| /milkyway         | /milkyway | true       | true      |
| /milkyway/tauceti | /milkyway | **true**   | **false** |

Hower, exact does not enforce trailing slashes:

| Location   | path      | exact     | matching? |
|------------|-----------|-----------|-----------|
| /milkyway  | /milkyway | false     | true      |
| /milkyway/ | /milkyway | **true**  | **true**  |

It also does not enforce case sensitivity.
