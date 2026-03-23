---
title: "The Aesthetics of Sparse Matrices"
date: 2023-05-14
description: Visualizing the patterns found in large-scale computational fluid dynamics datasets.
tags: [computational, philosophy]
---

There is something unexpectedly beautiful about the sparsity pattern of a large linear system.

When you discretize the Navier-Stokes equations on an unstructured mesh and assemble the resulting coefficient matrix $A$, you get a sparse matrix — a matrix with $N^2$ entries of which only $\mathcal{O}(N)$ are nonzero. The rest are exactly zero, a structural zero arising from the locality of the PDE stencil.

## Measuring Sparsity

For a matrix $A \in \mathbb{R}^{N \times N}$ with $\text{nnz}(A)$ nonzero entries, the *sparsity* (fraction of zeros) is:

$$\sigma(A) = 1 - \frac{\text{nnz}(A)}{N^2}$$

For a typical CFD mesh with $N = 10^6$ degrees of freedom and a 7-point stencil in 3D, we have $\text{nnz}(A) \approx 7N = 7 \times 10^6$, giving:

$$\sigma \approx 1 - \frac{7 \times 10^6}{10^{12}} = 1 - 7 \times 10^{-6} \approx 99.9993\%$$

The matrix is almost entirely zero.

## The Visual Structure

A *spy plot* — visualizing which entries are nonzero — reveals the hidden geometry of the discretization. A structured Cartesian mesh gives a banded matrix with a clean diagonal structure. An unstructured tetrahedral mesh produces something that looks like a controlled explosion: dense near the diagonal but with irregular off-diagonal spikes corresponding to non-local mesh connectivity.

For matrices arising from *graph Laplacians* on social networks or spectral methods on spherical domains, the patterns become something else entirely — fractal-like, self-similar across scales.

## Reordering as Art

The Cuthill-McKee algorithm reorders the rows and columns of a sparse matrix to reduce *bandwidth* — the furthest distance of a nonzero from the diagonal. The transformation:

$$A \leftarrow P A P^T$$

for a permutation matrix $P$ leaves the solution $x = A^{-1}b$ unchanged (up to reordering) but dramatically changes the visual character of $A$. A chaotic cloud of dots becomes a tight band hugging the diagonal.

There is something satisfying about this that goes beyond mere computational efficiency. The reordering reveals latent structure — an ordering of the unknowns that respects the geometry of the problem. In a sense, the Cuthill-McKee reordering is a form of *translation*: it re-expresses the same linear relationship in a language more natural to the underlying physics.

---

*I'm working on a short interactive visualization that lets you explore the sparsity patterns of matrices from different physical problems. Link coming soon.*
