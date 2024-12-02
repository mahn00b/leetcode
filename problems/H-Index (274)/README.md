
# H-Index(274)

[Leetcode Link](https://leetcode.com/problems/h-index/)

## Solution
------------

There's a few ways to approach this problem, but the solution I opted for uses a bucket sort. It's worth mentioning that a number of solutions utilize a binary search.

The goal is to find the h-index. The h-index measures the highest number of cited papers written by a single author. Based on this definition we can assume the following:

- The h-index is never going to be higher than the total amount of papers written
- The papers with the highest number of citations can also be counted along with the papers that have a lesser number of citations

Given these assumptions, we can start solving the problem by setting up an array to count the number of citations. Since some papers can have 0 citations, we can initialize the counting array to be `citations.length + 1`, to create a bucket for those as well. This covers the range of our possible h-index values.

We can iterate through the initial citation array to add up the number of papers that fall into each citation count bucket. If a paper has a citation count of greater than the total amount of papers, we can just count it towards the maximum bucket, since an h-index is maxed out at the total amount of papers

Once all the citations have been counted. We can work backwards to see which citation-count-buckets have a count of papers that is greater than or equal to the number of citations (the h-index)

We start at the highest possible value so we can consider all the papers that also fall into the lower citation counts. This is because of our second assumption.

