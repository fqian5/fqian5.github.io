---
title: "Numerical Stability in Symplectic Integrators"
date: 2023-06-28
description: Why preserving the symplectic form is critical for long-term orbital mechanics modeling.
tags: [computational, physics]
---

A common mistake when implementing numerical integrators for Hamiltonian systems is to reach for Runge-Kutta methods simply because they're familiar. RK4 has excellent short-term accuracy. But for long-time simulations — planetary orbits, molecular dynamics, lattice QCD Hamiltonian Monte Carlo — it fails catastrophically. The reason is *symplectic structure*.

## The Symplectic Form

A Hamiltonian system evolves on a phase space $(q, p) \in \mathbb{R}^{2n}$ under Hamilton's equations:

$$\dot{q}_i = \frac{\partial H}{\partial p_i}, \qquad \dot{p}_i = -\frac{\partial H}{\partial q_i}$$

The fundamental geometric structure is the symplectic two-form:

$$\omega = \sum_i dq_i \wedge dp_i$$

Liouville's theorem states that the exact flow $\phi_t$ *preserves* this form: $\phi_t^* \omega = \omega$. A numerical integrator $\Phi_h$ (for timestep $h$) is called *symplectic* if it satisfies the discrete analog:

$$J^T \Omega J = \Omega$$

where $J$ is the Jacobian of $\Phi_h$ and $\Omega$ is the matrix representation of $\omega$.

## Why Non-Symplectic Integrators Fail

A standard RK4 integrator has a truncation error $\mathcal{O}(h^5)$ per step but does *not* preserve $\omega$. Over $N$ steps, the phase space volume can drift systematically. For an orbit with period $T$, after $N \sim T/h$ steps, RK4 produces a spiral — the orbit either decays or expands unphysically.

The Störmer-Verlet (leapfrog) method, by contrast:

$$p_{n+1/2} = p_n - \frac{h}{2}\nabla_q V(q_n)$$
$$q_{n+1} = q_n + h\, p_{n+1/2}$$
$$p_{n+1} = p_{n+1/2} - \frac{h}{2}\nabla_q V(q_{n+1})$$

is only second-order accurate per step, but it is exactly symplectic. Over millions of steps, a planet integrated with leapfrog stays on a closed orbit; the same planet integrated with RK4 drifts.

## The Shadow Hamiltonian

A deeper explanation: symplectic integrators exactly solve a *modified* (or "shadow") Hamiltonian $\tilde{H} = H + h^k H_k + h^{k+1} H_{k+1} + \ldots$. The numerical trajectory is the exact trajectory of this nearby Hamiltonian. Errors in energy are bounded by $|H - \tilde{H}| = \mathcal{O}(h^k)$ for all time, rather than growing secularly.

This is why, in the Hamiltonian Monte Carlo algorithm for lattice field theory, leapfrog is essentially mandatory: we need the detailed balance condition to hold up to rounding error, which requires a reversible, area-preserving integrator.

---

*Next: higher-order symplectic methods (Forest-Ruth, Yoshida) and their application to Riemannian manifolds.*
