import React from 'react';
import { render } from '@testing-library/react';
import App, {getAllTracks} from './App';
import mockAxios from 'axios;'
import { Item } from 'semantic-ui-react';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('calls axios and returns music', async () => {
  mockAxios.get.mockImplentationOnce(() =>{
  Promise.resolve({
    data: {
      results: ['something.mp3']
    }
  })
  })
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
})
