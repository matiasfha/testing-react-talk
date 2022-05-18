import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import Main from '../components/Main';

import { setupServer} from 'msw/node';
import { handlers } from '../mocks/server-handlers';
// @ts-ignore
const server = setupServer(...handlers);

describe('Main', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  test('should render the main container', async () => {
    render(<Main />);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(10);
  })

});