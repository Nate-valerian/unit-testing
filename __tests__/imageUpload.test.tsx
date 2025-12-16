// __tests__/imageUpload.test.tsx - Updated version
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageUpload } from '../components/input-fields/imageUpload';

describe('ImageUpload', () => {
  const mockHandleChange = jest.fn();

  // RESET MOCK BEFORE EACH TEST
  beforeEach(() => {
    mockHandleChange.mockClear();
  });

  it('calls handleChange with correct when a file is selected', () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    const file = new File(['dummy content'], 'profile.png', { type: 'image/png' });
    const fileInput = document.getElementById('file-upload');

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('calls handleChange when a single valid file is dropped', () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    const file = new File(['dummy content'], 'profile.png', { type: 'image/png' });
    const dataTransfer = { files: [file] };
    const dropZone = screen.getByTestId('drop-zone');

    fireEvent.drop(dropZone, { dataTransfer });

    // Should be called exactly once
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call handleChange when a single non-image file is dropped', () => {
    render(<ImageUpload handleChange={mockHandleChange} />);

    const file = new File(['dummy content'], 'document.pdf', { type: 'application/pdf' });
    const dataTransfer = { files: [file] };
    const dropZone = screen.getByTestId('drop-zone');

    fireEvent.drop(dropZone, { dataTransfer });

    // Should NOT be called at all
    expect(mockHandleChange).not.toHaveBeenCalled();
  });



});

