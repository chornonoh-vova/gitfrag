import { memo, type ComponentPropsWithRef } from "react";

import "./AlgorithmExplainer.css";

function ExplainerWrapper({
  children,
  ...rest
}: ComponentPropsWithRef<"article">) {
  return (
    <article className="explainer-wrapper" {...rest}>
      {children}
    </article>
  );
}

function BubbleSortExplainer() {
  return (
    <ExplainerWrapper>
      <h2>🐢 Slow (Bubble Sort)</h2>
      <section>
        <h3>What it does:</h3>
        <p>
          Bubble sort compares <b>pairs of elements</b> and repeatedly{" "}
          <b>swaps them</b> if they’re in the wrong order. It “bubbles” the
          largest numbers to the top one step at a time.
        </p>
      </section>
      <section>
        <h3>How it works</h3>
        <ol>
          <li>Look at two neighbors.</li>
          <li>If they’re out of order → swap them.</li>
          <li>Repeat until the list is sorted.</li>
          <li>...Repeat again. And again. And again. 😅</li>
        </ol>
      </section>
      <section>
        <h3>Complexity</h3>
        <ul>
          <li>
            Average / Worst case:{" "}
            <code>
              O(n<sup>2</sup>)
            </code>{" "}
            → slow for big arrays
          </li>
          <li>
            Best case: <code>O(n)</code> → if already sorted
          </li>
          <li>
            Space: <code>O(1)</code>
          </li>
        </ul>
      </section>
      <section>
        <h3>Why it's “Slow”:</h3>
        <p>
          Because it keeps walking through the list again and again, even when
          most of the work is already done.
        </p>
      </section>

      <section>
        <h3>Fun fact:</h3>
        <p>
          Bubble sort is often the <b>first sorting algorithm</b> taught to
          beginners. Not because it’s efficient, but because it’s easy to
          visualize. You’ll rarely use it in real life.
        </p>
      </section>
    </ExplainerWrapper>
  );
}

function MergeSortExplainer() {
  return (
    <ExplainerWrapper>
      <h2>⚖️ Steady (Merge Sort)</h2>
      <section>
        <h3>What it does:</h3>
        <p>
          Merge sort is a divide-and-conquer algorithm that was invented by John
          von Neumann in 1945. It recursively <b>splits the list</b>, sorts each
          part, and then <b>merges</b> them back together in order.
        </p>
      </section>
      <section>
        <h3>How it works:</h3>
        <ol>
          <li>Divide the array into two parts.</li>
          <li>Keep splitting until the array consists of a single element.</li>
          <li>Merge sorted parts back together.</li>
          <li>Rinse and repeat!</li>
        </ol>
      </section>
      <section>
        <h3>Complexity:</h3>
        <ul>
          <li>
            Always: <code>O(n log n)</code> → very predictable
          </li>
          <li>
            Space: <code>O(n)</code> → needs extra memory for merging
          </li>
          <li>
            Stable sort: Preserves the order of the equal elements of an array
          </li>
        </ul>
      </section>
      <section>
        <h3>Why it's “Steady”:</h3>
        <p>
          This algorithm has a steady time complexity: <code>O(n log n)</code>{" "}
          always.
        </p>
      </section>
      <section>
        <h3>Fun fact:</h3>
        <p>
          Merge sort is one of the few sorting algorithms that’s{" "}
          <b>guaranteed fast</b>, which is why it’s used in places where
          stability and predictability matter, for example, sorting massive
          datasets.
        </p>
      </section>
    </ExplainerWrapper>
  );
}

function QuickSortExplainer() {
  return (
    <ExplainerWrapper>
      <h2>⚡️ Flash (Quick Sort)</h2>
      <section>
        <h3>What it does:</h3>
        <p>
          Quick sort picks an element (called pivot) and splits the list into
          two groups:
        </p>
        <ul>
          <li>Things smaller than the pivot</li>
          <li>Things bigger than the pivot</li>
        </ul>
        <p>Then it recursively sorts each group.</p>
      </section>
      <section>
        <h3>How it works:</h3>
        <ol>
          <li>Pick a pivot.</li>
          <li>
            Partition the array into <code>&lt; pivot</code> and{" "}
            <code>&gt;= pivot</code>.
          </li>
          <li>Recursively sort the partitions.</li>
          <li>Combine results.</li>
        </ol>
      </section>
      <section>
        <h3>Complexity:</h3>
        <ul>
          <li>
            Average / Best case: <code>O(n log n)</code> → blazing fast
          </li>
          <li>
            Worst case:{" "}
            <code>
              O(n<sup>2</sup>)
            </code>{" "}
            → when pivots are bad
          </li>
          <li>
            Space: <code>O(log n)</code> → in-place, memory-efficient
          </li>
        </ul>
      </section>
      <section>
        <h3>Why it's “Flash”:</h3>
        <p>
          When pivots are good, quick sort feels instant, it's one of the
          fastest comparison-based sorts in practice.
        </p>
      </section>
      <section>
        <h3>Fun fact:</h3>
        <p>
          Quick sort is used inside many standard libraries, including V8
          (JavaScript engine), but it usually has randomized pivots to avoid its
          worst-case slowdown.
        </p>
      </section>
    </ExplainerWrapper>
  );
}

function CountingSortExplainer() {
  return (
    <ExplainerWrapper>
      <h2>🚀 Turbo (Counting Sort)</h2>
      <section>
        <h3>What it does:</h3>
        <p>
          Counting sort is one algorithms that doesn’t <b>compare</b> elements
          directly. Instead, this algo <b>counts</b> how many times each value
          appears and reconstructs the sorted list from these counts.
        </p>
      </section>
      <section>
        <h3>How it works:</h3>
        <ol>
          <li>Find the range of numbers.</li>
          <li>Create a counting map.</li>
          <li>Fill counts.</li>
          <li>Build the sorted list from counts.</li>
        </ol>
      </section>
      <section>
        <h3>Complexity:</h3>
        <ul>
          <li>
            <code>O(n + k)</code> → where <var>k</var> is value range
          </li>
          <li>
            Space: <code>O(k)</code> → extra memory needed
          </li>
          <li>Only works for integers or discrete values</li>
        </ul>
      </section>
      <section>
        <h3>Why it's “Turbo”:</h3>
        <p>
          Since counting sort avoids comparisons entirely, it can be{" "}
          <b>dramatically faster</b> than merge or quick sort for numbers in a
          small range. On the other hand, it can become slow in some edge cases.
        </p>
      </section>
      <section>
        <h3>Fun fact:</h3>
        <p>
          Counting sort is used in <b>radix sort</b>, which is how modern
          databases, file systems, and some NoSQL engines sort huge datasets
          insanely fast.
        </p>
      </section>
    </ExplainerWrapper>
  );
}

function AlgorithmExplainerInner({ algorithm }: { algorithm: string }) {
  switch (algorithm) {
    case "bubble": {
      return <BubbleSortExplainer />;
    }
    case "merge": {
      return <MergeSortExplainer />;
    }
    case "quick": {
      return <QuickSortExplainer />;
    }
    case "counting": {
      return <CountingSortExplainer />;
    }
    default: {
      throw new Error(`Unknown algorithm ${algorithm}`);
    }
  }
}

export const AlgorithmExplainer = memo(AlgorithmExplainerInner);
