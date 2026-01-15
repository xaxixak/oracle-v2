import { useState, useEffect } from 'react';
import styles from './Projects.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
  description: string | null;
  ghqPath: string | null;
  learningCount: number;
  createdAt: string;
  updatedAt: string;
}

const API_BASE = '/api';

// Predefined color palette
const COLOR_PALETTE = [
  '#a78bfa', // Purple
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#8b5cf6', // Violet
  '#f97316', // Orange
  '#14b8a6', // Teal
];

async function fetchProjects(): Promise<{ projects: Project[]; total: number }> {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

async function createProject(data: {
  id: string;
  name: string;
  color: string;
  description?: string;
  ghqPath?: string;
}): Promise<{ success: boolean; project: Project }> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function updateProject(id: string, data: {
  name?: string;
  color?: string;
  description?: string;
  ghqPath?: string;
}): Promise<{ success: boolean; project: Project }> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function deleteProject(id: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    color: COLOR_PALETTE[0],
    description: '',
    ghqPath: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data.projects);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setFormData({
      id: project.id,
      name: project.name,
      color: project.color,
      description: project.description || '',
      ghqPath: project.ghqPath || ''
    });
    setShowForm(true);
  }

  function handleNewProject() {
    setEditingProject(null);
    setFormData({
      id: '',
      name: '',
      color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
      description: '',
      ghqPath: ''
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      if (editingProject) {
        await updateProject(editingProject.id, {
          name: formData.name,
          color: formData.color,
          description: formData.description || undefined,
          ghqPath: formData.ghqPath || undefined
        });
      } else {
        // Generate ID from name if not provided
        const id = formData.id || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        await createProject({
          id,
          name: formData.name,
          color: formData.color,
          description: formData.description || undefined,
          ghqPath: formData.ghqPath || undefined
        });
      }
      setShowForm(false);
      loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save project');
    }
  }

  async function handleDelete(project: Project) {
    if (!confirm(`Delete project "${project.name}"? This will not delete the learnings, just the project category.`)) {
      return;
    }

    try {
      await deleteProject(project.id);
      loadProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.subtitle}>Organize learnings by project with colors</p>
        <button className={styles.newButton} onClick={handleNewProject}>
          + New Project
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {showForm && (
        <div className={styles.formOverlay}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{editingProject ? 'Edit Project' : 'New Project'}</h2>

            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Project"
                required
              />
            </div>

            {!editingProject && (
              <div className={styles.field}>
                <label>ID (optional, auto-generated from name)</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={e => setFormData({ ...formData, id: e.target.value })}
                  placeholder="my-project"
                />
              </div>
            )}

            <div className={styles.field}>
              <label>Color</label>
              <div className={styles.colorPicker}>
                {COLOR_PALETTE.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`${styles.colorSwatch} ${formData.color === color ? styles.selected : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({ ...formData, color })}
                  />
                ))}
                <input
                  type="color"
                  value={formData.color}
                  onChange={e => setFormData({ ...formData, color: e.target.value })}
                  className={styles.customColor}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Description (optional)</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the project"
                rows={2}
              />
            </div>

            <div className={styles.field}>
              <label>GHQ Path (optional)</label>
              <input
                type="text"
                value={formData.ghqPath}
                onChange={e => setFormData({ ...formData, ghqPath: e.target.value })}
                placeholder="github.com/user/repo"
              />
            </div>

            <div className={styles.formActions}>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className={styles.primary}>
                {editingProject ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className={styles.empty}>
          <p>No projects yet.</p>
          <p>Create a project to organize your learnings.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {projects.map(project => (
            <div
              key={project.id}
              className={styles.card}
              style={{ borderLeftColor: project.color }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.colorDot} style={{ backgroundColor: project.color }} />
                <h3>{project.name}</h3>
              </div>

              {project.description && (
                <p className={styles.description}>{project.description}</p>
              )}

              <div className={styles.meta}>
                <span className={styles.count}>{project.learningCount} learnings</span>
                {project.ghqPath && (
                  <span className={styles.ghqPath}>{project.ghqPath}</span>
                )}
              </div>

              <div className={styles.cardActions}>
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project)} className={styles.danger}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
