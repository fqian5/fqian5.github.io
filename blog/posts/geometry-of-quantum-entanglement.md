---
title: "The Geometry of Quantum Entanglement"
date: 2023-10-24
description: A geometric interpretation of EPR pairs through the lens of differential topology.
tags: [physics, topology]
---

Entanglement is perhaps the most counterintuitive feature of quantum mechanics. Two particles can share a quantum state such that measuring one instantaneously determines the state of the other, regardless of the distance between them. But what does this look like geometrically?

## The EPR State

The canonical example is the singlet state, one of the four Bell states:

$$|\Psi^-\rangle = \frac{1}{\sqrt{2}}\left(|01\rangle - |10\rangle\right)$$

This state cannot be written as a product $|\psi_A\rangle \otimes |\psi_B\rangle$ — the defining property of entanglement.

## The Bloch Sphere and Its Limits

For a single qubit, the state space is elegantly described by the Bloch sphere. Any pure state can be written as:

$$|\psi\rangle = \cos\frac{\theta}{2}|0\rangle + e^{i\phi}\sin\frac{\theta}{2}|1\rangle$$

where $\theta \in [0, \pi]$ and $\phi \in [0, 2\pi)$ parameterize a point on $S^2$. Mixed states fill the interior of the ball.

For two qubits, however, the state space is $\mathbb{CP}^3$, a six-dimensional real manifold. The entangled states lie on a submanifold that has no clean classical geometric analog — this is where the intuition breaks down and the topology becomes genuinely strange.

## Differential Topology of Separability

A pure two-qubit state $|\psi\rangle \in \mathbb{C}^2 \otimes \mathbb{C}^2$ is *separable* if and only if it lies on the Segre variety — the image of the Segre embedding:

$$\mathbb{CP}^1 \times \mathbb{CP}^1 \hookrightarrow \mathbb{CP}^3$$

The degree of entanglement can be measured by the concurrence $C$, related to the Schmidt decomposition. For a state written as $\sum_i \lambda_i |e_i\rangle|f_i\rangle$:

$$C = 2\lambda_1\lambda_2$$

where $\lambda_1, \lambda_2$ are the Schmidt coefficients with $\lambda_1^2 + \lambda_2^2 = 1$.

---

*This post is a work in progress. More geometric analysis — including the connection to fibre bundles and holonomy — coming soon.*
