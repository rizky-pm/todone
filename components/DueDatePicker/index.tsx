import { useEffect, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { ControllerRenderProps } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import _ from 'lodash';

interface IProps {
  field: ControllerRenderProps<
    {
      title: string;
      categoryId: string;
      priority: 'LOW' | 'MEDIUM' | 'HIGH';
      dueDate: Date;
      description?: string | undefined;
    },
    'dueDate'
  >;
}

const DueDatePicker = (props: IProps) => {
  const { field } = props;

  const now = new Date();
  const nowPlus1Hour = new Date(now);
  nowPlus1Hour.setHours(now.getHours() + 1, now.getMinutes(), 0, 0);

  const [hours, setHours] = useState<number | null>(
    field.value ? field.value.getHours() : null
  );
  const [minutes, setMinutes] = useState<number | null>(
    field.value ? field.value.getMinutes() : null
  );

  const dateSelected = !!field.value;

  useEffect(() => {
    if (!field.value) return;
    if (hours === null || minutes === null) return;

    const updated = new Date(field.value);
    updated.setHours(hours);
    updated.setMinutes(minutes);
    field.onChange(updated);
  }, [hours, minutes]);

  const isToday =
    field.value &&
    new Date(field.value).toDateString() === new Date().toDateString();

  const isTimeDisabled = (h: number, m: number) => {
    if (!isToday) return false;

    const now = new Date();
    if (h < now.getHours()) return true;
    if (h === now.getHours() && m < now.getMinutes()) return true;
    return false;
  };

  return (
    <>
      <Calendar
        mode='single'
        selected={field.value}
        onSelect={(date) => {
          if (!date) return;

          const merged = new Date(date);

          if (hours === null || minutes === null) {
            merged.setHours(nowPlus1Hour.getHours());
            merged.setMinutes(nowPlus1Hour.getMinutes());
          } else {
            merged.setHours(hours);
            merged.setMinutes(minutes);
          }

          field.onChange(merged);
        }}
        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        initialFocus
      />

      <div className='flex items-center gap-2 mt-2'>
        <Select
          disabled={!dateSelected}
          value={hours !== null ? _.toString(hours) : undefined}
          onValueChange={(value) => setHours(_.toNumber(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder='Hour' />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 24 }).map((__, i) => {
                const disabled =
                  dateSelected && isTimeDisabled(i, minutes ?? 0);
                return (
                  <SelectItem key={i} value={_.toString(i)} disabled={disabled}>
                    {String(i).padStart(2, '0')}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        :
        <Select
          disabled={!dateSelected}
          value={minutes !== null ? _.toString(minutes) : undefined}
          onValueChange={(value) => setMinutes(_.toNumber(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder='Minute' />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {Array.from({ length: 60 }).map((__, i) => {
                const disabled = dateSelected && isTimeDisabled(hours ?? 0, i);
                return (
                  <SelectItem key={i} value={_.toString(i)} disabled={disabled}>
                    {String(i).padStart(2, '0')}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default DueDatePicker;
