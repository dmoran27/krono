import { ReactNode } from 'react';
import FormSection from './FormSection';
import AddButton from './AddButton';

interface Props<T> {
  title: string;
  items: T[];
  onAdd: () => void;
  addText: string;
  renderItem: (item: T, index: number) => ReactNode;
}

export default function DynamicList<T>({ title, items, onAdd, addText, renderItem }: Props<T>) {
  return (
    <FormSection title={title}>
      <div className="space-y-2">
        {items.map((item, index) => renderItem(item, index))}
      </div>
      <AddButton text={addText} onClick={onAdd} />
    </FormSection>
  );
}