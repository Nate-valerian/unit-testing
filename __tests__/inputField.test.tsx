import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from '../components/input-fields/inputField';

    describe('InputField', () => {
      const label = 'First Name';
      const name = 'firstName';
      const placeholder = 'nate';


      it('renders correctly with label and placeholder', () => {
        render(<InputField label={label} name={name} value="" onChange={() => {}} placeholder={placeholder} required />);

        const input = screen.getByPlaceholderText(placeholder);
        expect(input).toBeInTheDocument();

        const labelElement = screen.getByText(label);
        expect(labelElement).toBeInTheDocument();

      });


      it('calls onChange when typing', () => {
        const handleChange = jest.fn();
        render(<InputField label={label} name={name} value="" onChange={handleChange} placeholder={placeholder} required />);
        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'John' } });
        expect(handleChange).toHaveBeenCalledTimes(1);

      });


      it('shows error if required and blurred with empty value', () => {
        render(<InputField label={label} name={name} value="" onChange={() => {}} placeholder={placeholder} required />);
        const input = screen.getByRole('textbox');
        fireEvent.blur(input);
        const errorMessage = screen.getByText('required', { exact: false });
        expect(errorMessage).toBeInTheDocument();

      });

      it('does not show error if required and if value is present', () => {
        render(<InputField label={label} name={name} value="nate" onChange={() => {}} placeholder={placeholder} required />);
        const input = screen.getByRole('textbox');
        fireEvent.blur(input);
        const errorMessage = screen.queryByText(`${label} is required`);
        expect(errorMessage).not.toBeInTheDocument();

      });

    })


