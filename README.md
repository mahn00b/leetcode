# Readme

## Introduction
--------------
This repository contains all my solutions for [leetcode]() problems, along with explanations. The problems can be found in the `/problems`.


## Structure
-------------

Initially, I want to keep the layout fairly simple, but later on, I have plans to divide the repo into multiple different solutions. Below is an example of what one problem will look like.

```
| problems
    | [problem-name (#no)]
      | README.md (Containing the problem, constraints, and solution thought process)
      | solution.js
      | solution.py
      | solution.java
| algorithms
  | [use case]
    | [algorithm-name]
      | README.md
```

### problems

Each problem will have it's own directory, along with a README that includes links to the original leetcode page, the exact problem statement, the constraints, and finally the thought process around my solution.

Each directory will have the dictated solution written in multiple languages. This will help with learning new languages and solidify the solutions as concepts more than memorized code. Though, it may very much be the case that each problem will initially only have a javascript solution.

### algorithms

When new problems require a solution that introduces a new algorithm, there will be a new entry created in the algorithms directory. Initially, each write-up will include descriptions, runtime complexity, links to references, drawbacks of using the algorithm, and some psuedo-code for an illustrative description.

There will also be a general README to reference all the algorithms in one place.

Each problem that uses a specific algorithm from this directory will reference the same README.md for convenience.


## Future plans
-----------------
If I ever encounter the same problem, but come up with a better solution, I will begin to create subdirectories to represent the evolution of that solution. Follow-up solutions will explain why it's better than the previous. The best solution will have the highest version number.
