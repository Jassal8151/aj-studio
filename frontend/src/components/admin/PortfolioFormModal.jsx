import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloudUploadOutline, IoCheckmarkCircle, IoImageOutline } from 'react-icons/io5';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { CATEGORIES, CAMERA_PRESETS } from '../../constants/categories';
import { uploadToCloudinary } from '../../services/cloudinaryService';

const PortfolioFormModal = ({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');
  const [publicId, setPublicId] = useState(initialData?.publicId || '');
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const categoriesFiltered = CATEGORIES.filter((c) => c !== 'All');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      category: initialData?.category || categoriesFiltered[0],
      location: initialData?.location || '',
      date: initialData?.date || new Date().toISOString().split('T')[0],
      camera: initialData?.camera || CAMERA_PRESETS[0],
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('description', initialData.description || '');
      setValue('category', initialData.category);
      setValue('location', initialData.location || '');
      setValue('date', initialData.date ? initialData.date.split('T')[0] : '');
      setValue('camera', initialData.camera || CAMERA_PRESETS[0]);
      setPreviewUrl(initialData.imageUrl || '');
      setPublicId(initialData.publicId || '');
      setSelectedImageFile(null);
    } else {
      reset({
        title: '',
        description: '',
        category: categoriesFiltered[0],
        location: '',
        date: new Date().toISOString().split('T')[0],
        camera: CAMERA_PRESETS[0],
      });
      setPreviewUrl('');
      setPublicId('');
      setSelectedImageFile(null);
    }
  }, [initialData, isOpen, setValue, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onFormSubmit = async (data) => {
    if (!previewUrl) {
      alert('Please select an image before saving');
      return;
    }

    if (selectedImageFile) {
      setUploadingImage(true);
      try {
        const res = await uploadToCloudinary(selectedImageFile);
        setPreviewUrl(res.imageUrl);
        setPublicId(res.publicId);

        onSubmit({
          ...data,
          imageUrl: res.imageUrl,
          publicId: res.publicId,
        });
      } catch (err) {
        console.error('Upload Error:', err);
        alert('Image upload failed. Please try again.');
      } finally {
        setUploadingImage(false);
      }
      return;
    }

    if (!publicId && !initialData?.imageUrl) {
      alert('Please upload an image before saving');
      return;
    }

    onSubmit({
      ...data,
      imageUrl: previewUrl,
      publicId,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        {/* Direct Cloudinary Upload Dropzone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-neutral-300 tracking-wider uppercase">
            Image Upload (Direct Unsigned Cloudinary) <span className="text-amber-500">*</span>
          </label>

          <div className="relative border-2 border-dashed border-neutral-800 hover:border-amber-500/60 rounded-xl p-4 transition-colors text-center bg-neutral-950/60">
            {previewUrl ? (
              <div className="relative aspect-[16/9] w-full max-h-48 rounded-lg overflow-hidden border border-neutral-800 mx-auto">
                <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-emerald-500/90 text-neutral-950 text-[10px] font-bold uppercase flex items-center gap-1 shadow">
                  <IoCheckmarkCircle className="w-3.5 h-3.5" />
                  Uploaded
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-2">
                <IoCloudUploadOutline className="w-10 h-10 mx-auto text-amber-500 animate-bounce" />
                <p className="text-xs text-neutral-300 font-medium">
                  {uploadingImage ? 'Uploading image to Cloudinary...' : 'Select an image. It will upload when you save.'}
                </p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                  JPG, PNG, WEBP UP TO 10MB
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={uploadingImage}
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Title */}
        <Input
          label="Photograph Title"
          required
          placeholder="e.g., Ethereal Bridal Veil"
          error={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />

        {/* Category & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-300 tracking-wider uppercase">
              Category <span className="text-amber-500">*</span>
            </label>
            <select
              className="w-full bg-neutral-950 text-xs text-neutral-100 rounded-lg p-3 border border-neutral-800 focus:outline-none focus:border-amber-500/80 cursor-pointer"
              {...register('category', { required: 'Category is required' })}
            >
              {categoriesFiltered.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Capture Date"
            type="date"
            error={errors.date?.message}
            {...register('date')}
          />
        </div>

        {/* Location & Camera */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Location"
            placeholder="e.g., Amalfi Coast, Italy"
            {...register('location')}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-300 tracking-wider uppercase">
              Camera Equipment
            </label>
            <input
              type="text"
              list="camera-presets"
              placeholder="e.g., Canon EOS R5 (85mm f/1.2)"
              className="w-full bg-neutral-950 text-xs text-neutral-100 placeholder-neutral-500 rounded-lg p-3 border border-neutral-800 focus:outline-none focus:border-amber-500/80"
              {...register('camera')}
            />
            <datalist id="camera-presets">
              {CAMERA_PRESETS.map((cam) => (
                <option key={cam} value={cam} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-neutral-300 tracking-wider uppercase">
            Description / Story Behind The Shot
          </label>
          <textarea
            rows={3}
            placeholder="Optional context about lighting, subject, or story..."
            className="w-full bg-neutral-950 text-xs text-neutral-100 placeholder-neutral-500 rounded-lg p-3 border border-neutral-800 focus:outline-none focus:border-amber-500/80"
            {...register('description')}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gold"
            className="flex-1"
            isLoading={isLoading || uploadingImage}
            disabled={!previewUrl || uploadingImage}
          >
            {initialData ? 'Update Portfolio' : 'Save To Portfolio'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PortfolioFormModal;
