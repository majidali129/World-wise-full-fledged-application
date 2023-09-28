

import Spinner from '../../ui/Spinner'

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();
  // const { mutate: updateSetting, isLoading: isUpdating } = useUpdateSetting();
  const {updateSetting, isUpdating} = useUpdateSetting()

  if (isLoading) return <Spinner />;

  const handleUpdateSetting = (e, field) => {
    const {value} = e.target;
    if(!value) return;

    updateSetting({[field]: value})
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdateSetting(e, 'minBookingLength')}
          disabled={isUpdating}
          id='min-nights'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, 'maxBookingLength')}
          disabled={isUpdating}
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdateSetting(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, 'breakfastPrice')}
          disabled={isUpdating}
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
