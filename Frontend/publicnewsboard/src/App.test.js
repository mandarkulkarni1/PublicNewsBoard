import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div=document.createElement('div');
    render(<App />,div);
  unmountComponentAtNode(div);
  });
