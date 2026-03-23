---
title: "Rust for High-Performance Lattice QCD"
date: 2023-09-12
description: Evaluating memory safety and zero-cost abstractions in large-scale physics simulations.
tags: [computational, physics]
---

Lattice QCD (quantum chromodynamics) is one of the most computationally demanding problems in theoretical physics. We discretize spacetime onto a hypercubic lattice and compute path integrals via Monte Carlo sampling — requiring petabytes of data, weeks of supercomputer time, and extremely tight numerical tolerances.

The dominant languages have historically been Fortran and C++. But with the maturation of Rust, I've been exploring whether its ownership model and zero-cost abstractions offer a compelling alternative.

## The Wilson Action

The basic object in lattice QCD is the link variable $U_\mu(x) \in \text{SU}(3)$, representing the gauge field along the bond from site $x$ to $x + \hat{\mu}$. The simplest discretization of the QCD action is the Wilson action:

$$S_W = \beta \sum_{x} \sum_{\mu < \nu} \left(1 - \frac{1}{3} \text{Re}\,\text{Tr}\left[U_{\mu\nu}(x)\right]\right)$$

where $U_{\mu\nu}(x)$ is the *plaquette* — the product of links around an elementary square:

$$U_{\mu\nu}(x) = U_\mu(x)\, U_\nu(x+\hat{\mu})\, U_\mu^\dagger(x+\hat{\nu})\, U_\nu^\dagger(x)$$

and $\beta = 6/g^2$ is the inverse coupling.

## Memory Safety in SU(3) Arithmetic

The core computational kernel is SU(3) matrix multiplication — performed billions of times per configuration. In C++, a typical implementation uses raw pointers or aligned arrays, with all the attendant risks: buffer overflows, use-after-free, data races in threaded code.

In Rust, the ownership model eliminates these classes of bugs *at compile time*. A naive SU(3) type might look like:

```rust
#[repr(C, align(32))]
pub struct Su3Matrix {
    data: [[Complex<f64>; 3]; 3],
}
```

The `align(32)` attribute ensures SIMD-friendly memory layout. The compiler enforces that this matrix is never simultaneously accessed mutably from two threads — no mutex needed in the common read-many/write-once pattern of HMC updates.

## Benchmarks

Preliminary results show Rust's `nalgebra`-based SU(3) kernels achieve ~95% of the throughput of hand-optimized C++ with SSE4 intrinsics, with zero unsafe code. For production runs where correctness is paramount, this tradeoff is highly favorable.

---

*This is part of an ongoing project. A full benchmark suite comparing Rust, C++, and Julia implementations is in preparation.*
