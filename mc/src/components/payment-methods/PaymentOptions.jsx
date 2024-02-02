import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PaymentCard from '../payment-card';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PaymentOptions = ({ methods, handleOptionUpdate }) => {
  const onDragEnd = (result) => {
    // dropped outside the list
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

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
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
                key={item.displayOrder}
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
