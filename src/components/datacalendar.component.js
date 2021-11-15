import React from "react";
// import "react-bulma-components/dist/react-bulma-components.min.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';

export default function FCDatatable(props) {

  const handleEventClick = (clickInfo) => {
    props.modalShow(clickInfo.event.extendedProps);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, listPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,list60days",
      }}
      initialView="dayGridMonth"
      locale="fr"
      firstDay={1}
      weekNumbers={true}
      dayMaxEventRows={true}
      selectable={true}
      views={{
        list60days: {
          type: "list",
          visibleRange: function (currentDate) {
            const startDate = new Date(currentDate.valueOf());
            const endDate = new Date(currentDate.valueOf());

            startDate.setDate(startDate.getDate() - 360);
            endDate.setDate(endDate.getDate() + 180);

            return {
              start: startDate,
              end: endDate,
            };
          },
          buttonText: "Liste",
        },
      }}
      events={props.data}
      eventClick={handleEventClick}
    />
  );
}
