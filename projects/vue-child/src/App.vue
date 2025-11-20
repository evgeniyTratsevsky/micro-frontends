<template>
  <div class="vue-child-container">
    <div class="vue-header">
      <h2>Vue Child Application</h2>
      <div class="badge">Module Federation</div>
    </div>

    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <div v-if="activeTab === 'overview'" class="overview">
        <h3>Welcome to Vue Micro-Frontend</h3>
        <p class="subtitle">
          This is a Vue 3 application integrated into the Angular host using Module Federation.
          Experience the power of the Composition API and reactive data binding.
        </p>
        
        <div class="info-box">
          <h4>✨ Key Features</h4>
          <ul>
            <li>Vue 3 with Composition API</li>
            <li>Reactive state management</li>
            <li>Single File Components (SFC)</li>
            <li>Seamless integration with Angular host</li>
            <li>Optimized bundle with tree-shaking</li>
          </ul>
        </div>
      </div>

      <div v-if="activeTab === 'features'" class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.title"
          class="feature-card"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.description }}</p>
        </div>
      </div>

      <div v-if="activeTab === 'interactive'" class="interactive">
        <h3>Interactive Demo</h3>
        <p class="subtitle">Experience Vue's reactive data binding</p>
        
        <div class="demo-section">
          <div class="counter-card">
            <h4>Counter: {{ counter }}</h4>
            <div class="button-group">
              <button @click="counter--" class="btn btn-danger">-</button>
              <button @click="counter = 0" class="btn btn-secondary">Reset</button>
              <button @click="counter++" class="btn btn-success">+</button>
            </div>
          </div>

          <div class="input-card">
            <h4>Live Input</h4>
            <input 
              v-model="message" 
              type="text" 
              placeholder="Type something..."
              class="demo-input"
            />
            <p class="output">You typed: <strong>{{ message || '(nothing yet)' }}</strong></p>
          </div>

          <div class="list-card">
            <h4>Dynamic List</h4>
            <div class="add-item">
              <input 
                v-model="newItem" 
                @keyup.enter="addItem"
                type="text" 
                placeholder="Add item..."
                class="demo-input"
              />
              <button @click="addItem" class="btn btn-primary">Add</button>
            </div>
            <ul class="item-list">
              <li v-for="(item, index) in items" :key="index">
                {{ item }}
                <button @click="removeItem(index)" class="btn-remove">×</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const activeTab = ref('overview');
    const counter = ref(0);
    const message = ref('');
    const newItem = ref('');
    const items = ref(['Vue 3', 'Module Federation', 'Micro-frontends']);

    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'features', label: 'Features' },
      { id: 'interactive', label: 'Interactive Demo' }
    ];

    const features = [
      {
        icon: '🎯',
        title: 'Composition API',
        description: 'Modern Vue 3 Composition API for better code organization and reusability'
      },
      {
        icon: '⚡',
        title: 'Reactive System',
        description: 'Powerful reactivity system that automatically tracks dependencies'
      },
      {
        icon: '🔧',
        title: 'Single File Components',
        description: 'Template, script, and styles in one file for better maintainability'
      },
      {
        icon: '🚀',
        title: 'Performance',
        description: 'Optimized virtual DOM and efficient rendering for fast applications'
      }
    ];

    const addItem = () => {
      if (newItem.value.trim()) {
        items.value.push(newItem.value.trim());
        newItem.value = '';
      }
    };

    const removeItem = (index) => {
      items.value.splice(index, 1);
    };

    return {
      activeTab,
      tabs,
      features,
      counter,
      message,
      newItem,
      items,
      addItem,
      removeItem
    };
  }
};
</script>

<style scoped>
.vue-child-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.vue-header {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vue-header h2 {
  margin: 0;
  font-size: 1.8rem;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.tabs {
  background: #f8f9fa;
  padding: 0;
  display: flex;
  border-bottom: 2px solid #e9ecef;
}

.tab {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab:hover {
  background: #e9ecef;
  color: #42b883;
}

.tab.active {
  color: #42b883;
  border-bottom-color: #42b883;
  background: white;
}

.content {
  padding: 2rem;
  min-height: 400px;
}

.overview h3 {
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.8;
  font-size: 1.1rem;
}

.info-box {
  background: #f7fafc;
  border-left: 4px solid #42b883;
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 2rem;
}

.info-box h4 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.info-box ul {
  list-style: none;
  padding: 0;
}

.info-box li {
  padding: 0.5rem 0;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.info-box li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #42b883;
  font-weight: bold;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: white;
  border: 2px solid #e2e8f0;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  color: #2d3748;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
}

.feature-card p {
  color: #718096;
  line-height: 1.6;
  font-size: 0.95rem;
}

.interactive h3 {
  color: #2d3748;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.demo-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.counter-card,
.input-card,
.list-card {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
}

.counter-card h4,
.input-card h4,
.list-card h4 {
  color: #2d3748;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-success {
  background: #42b883;
  color: white;
}

.btn-success:hover {
  background: #35a372;
}

.btn-danger {
  background: #e53e3e;
  color: white;
}

.btn-danger:hover {
  background: #c53030;
}

.btn-secondary {
  background: #718096;
  color: white;
}

.btn-secondary:hover {
  background: #4a5568;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
}

.demo-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.demo-input:focus {
  outline: none;
  border-color: #42b883;
}

.output {
  margin-top: 1rem;
  color: #4a5568;
  text-align: center;
}

.add-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.item-list {
  list-style: none;
  padding: 0;
}

.item-list li {
  background: white;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
}

.btn-remove {
  background: #e53e3e;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  transition: all 0.3s ease;
}

.btn-remove:hover {
  background: #c53030;
  transform: scale(1.1);
}
</style>

