import { render,  screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TweetForm from '../components/TweetForm';

describe('TweetForm', () => {
  test('should render the form', () => {
    render(<TweetForm onSubmit={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  })

  test('should call onSubmit when the form is submitted', async () => {
    const handleSubmit = jest.fn();
    handleSubmit.mockImplementation((event) => {
      console.log(event);
    });
    render(<TweetForm onSubmit={handleSubmit} />);
    
    await userEvent.type(screen.getByRole("textbox"), 'Hello world');
    await userEvent.click(screen.getByText("Twitting"));
    
    expect(handleSubmit).toHaveBeenCalledWith('Hello world');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  })
})