import type { ReactNode, TextareaHTMLAttributes } from 'react';
import React, { useState, forwardRef } from 'react';
import cn from 'classnames';
import { PadlockLockedFillIcon } from '@navikt/aksel-icons';

import { omit } from '../../../utils';
import { Label, Paragraph, ErrorMessage } from '../../Typography';
import type { FormFieldProps } from '../useFormField';
import type { CharacterLimitProps } from '../CharacterCounter';
import { CharacterCounter } from '../CharacterCounter';

import { useTextarea } from './useTextarea';
import classes from './Textarea.module.css';
import utilityClasses from './../../../utils/utility.module.css';

export type TextareaProps = {
  /** Label */
  label?: ReactNode;
  /** Visually hides `label` and `description` (still available for screen readers)  */
  hideLabel?: boolean;
  /** Changes field size and paddings */
  size?: 'xsmall' | 'small' | 'medium' | 'large';

  /**
   *  The characterLimit function calculates remaining characters based on `maxCount`
   *
   *  Provide a `label` function that takes count as parameter and returns a message.
   *
   *  Use `srLabel` to describe `maxCount` for screen readers.
   *
   *  Defaults to Norwegian if no labels are provided.
   */
  characterLimit?: CharacterLimitProps;
} & Omit<FormFieldProps, 'size'> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Textarea field
 *
 * @example
 * ```tsx
 * <Textarea label="Textarea label">
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { label, description, style, characterLimit, hideLabel, ...rest } =
      props;

    const {
      textareaProps,
      descriptionId,
      hasError,
      errorId,
      size = 'medium',
      readOnly,
    } = useTextarea(props);

    const [value, setValue] = useState(props.defaultValue);
    const characterLimitId = `${textareaProps.id}-charactercount}`;
    const hasCharacterLimit = characterLimit != null;

    const describedBy = cn(
      textareaProps['aria-describedby'],
      hasCharacterLimit && characterLimitId,
    );

    return (
      <Paragraph
        as='div'
        size={size}
        style={style}
        className={cn(
          classes.formField,
          textareaProps.disabled && classes.disabled,
          readOnly && classes.readonly,
          rest.className,
        )}
      >
        {label && (
          <Label
            size={size}
            weight='medium'
            htmlFor={textareaProps.id}
            className={cn(
              classes.label,
              hideLabel && utilityClasses.visuallyHidden,
            )}
          >
            {readOnly && (
              <PadlockLockedFillIcon
                aria-hidden
                className={classes.padlock}
              />
            )}
            <span>{label}</span>
          </Label>
        )}
        {description && (
          <Paragraph
            id={descriptionId}
            as='div'
            size={size}
            className={cn(
              classes.description,
              hideLabel && utilityClasses.visuallyHidden,
            )}
          >
            {description}
          </Paragraph>
        )}
        <textarea
          {...omit(['size', 'error', 'errorId'], rest)}
          {...textareaProps}
          className={cn(
            classes.textarea,
            utilityClasses.focusable,
            classes[size],
          )}
          ref={ref}
          aria-describedby={describedBy}
          onChange={(e) => {
            textareaProps?.onChange?.(e);
            setValue(e.target.value);
          }}
        />
        {hasCharacterLimit && (
          <CharacterCounter
            size={size}
            value={value ? value.toString() : ''}
            id={characterLimitId}
            {...characterLimit}
          />
        )}
        <div
          className={classes.errorMessage}
          id={errorId}
          aria-live='polite'
          aria-relevant='additions removals'
        >
          {hasError && <ErrorMessage size={size}>{props.error}</ErrorMessage>}
        </div>
      </Paragraph>
    );
  },
);
