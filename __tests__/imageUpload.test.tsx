import {render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImageUpload } from '../components/input-fields/imageUpload';

describe('ImageUpload', () => {
  const mockHandleChange = jest.fn();


  it('calss handleChange with correct when a file is selected', () => {
    render(<ImageUpload handleChange={mockHandleChange}/>);

    const file = new File(['dummy content'], 'profile.png', { type: 'image/png' });

    const fileInput = document.getElementById('file-upload');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          files: expect.arrayContaining([file]),


        }),
      }),

    );



  })


});
