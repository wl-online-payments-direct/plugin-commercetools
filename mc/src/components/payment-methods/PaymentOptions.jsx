import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PaymentCard from '../payment-card';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PaymentOptions = ({ methods, handleOptionUpdate }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const options = reorder(
      methods,
      result.source.index,
      result.destination.index
    );
    handleOptionUpdate(options);
  };

  const handlePaymentOptionUpdate = (label, key, value) => {
    const activeItem = methods.find((method) => method.label === label);
    methods[activeItem.displayOrder][key] = value;
    handleOptionUpdate(methods);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            className="payment-options"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {methods.map((item, index) => (
              <Draggable
                key={`draggable${index}`}
                draggableId={`draggeble-${item.displayOrder}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="pay-option"
                    key={`payment-options-${index}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PaymentCard
                      {...item}
                      handlePaymentOptionUpdate={handlePaymentOptionUpdate}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PaymentOptions;
