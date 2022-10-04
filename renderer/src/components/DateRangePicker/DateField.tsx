import { useRef } from "react";
import { useLocale } from "react-aria";
import { useDateFieldState } from "@react-stately/datepicker";
import { useDateField, useDateSegment } from "react-aria";
import { createCalendar } from "@internationalized/date";

export function DateField(props: any) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref: any = useRef();
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} className="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

function DateSegment({ segment, state }: any) {
  const ref: any = useRef();
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null
            ? String(segment.maxValue).length + "ch"
            : undefined,
      }}
      className={`group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-sky-600 focus:text-white ${
        !segment.isEditable ? "text-gray-500" : "text-gray-600"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? "" : 0,
          pointerEvents: "none",
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder
        ? ""
        : segment.value < 10
        ? `0${segment.text}`
        : segment.text}
    </div>
  );
}
