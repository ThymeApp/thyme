// @flow

import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import isSameDay from 'date-fns/is_same_day';

import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';

import { timeElapsed } from 'core/thyme';
import { formatTime, formatDate } from 'core/intl';
import { treeDisplayName } from 'core/projects';

import { useResponsive } from 'components/Responsive';

import { sortedProjects } from 'sections/Projects/selectors';
import { colourValue } from 'sections/Projects/colours';

import EditableEntry from '../Entry/EditableEntry';

import './ListEntry.css';

type ListEntryProps = {
  entry: TimeType;
  enabledNotes: boolean;
  enabledProjects: boolean;
  enabledEndDate: boolean;
  round: Rounding;
  roundAmount: number;
  onRemove: (entry: TimeType) => void;
  onEntryUpdate: (entry: TimeType | TimePropertyType) => void;
  onAddProject: (project: string, entry?: TimeType | TimePropertyType) => string;
};

function useToggle() {
  const [toggled, setToggled] = useState<boolean>(false);

  const on = useCallback(() => setToggled(true), []);
  const off = useCallback(() => setToggled(false), []);
  const toggle = useCallback(() => setToggled(!toggled), [toggled]);

  return [toggled, on, off, toggle];
}

function ListEntry(props: ListEntryProps) {
  const {
    entry,
    round,
    roundAmount,
    enabledNotes,
    enabledProjects,
    enabledEndDate,
    onRemove,
    onEntryUpdate,
    onAddProject,
  } = props;
  const {
    start,
    end,
    notes,
  } = entry;

  const [isMobile] = useResponsive({ max: 'tablet' });
  const [confirmOpen, openConfirm, closeConfirm] = useToggle();
  const [popupOpen, openPopup, closePopup] = useToggle();
  const [editOpen, openEdit, closeEdit] = useToggle();
  const [editingEntry, setEditingEntry] = useState<TimeType>({ ...entry });

  const project = useSelector(useCallback((state) => {
    const projects = sortedProjects(state);

    return projects.find((item) => item.id === entry.project);
  }, [entry.project]));

  const onHandleOpenEdit = useCallback(() => {
    // reset editing entry to current entry
    setEditingEntry({ ...entry });

    // close the popup if it's open
    closePopup();

    // open the modal
    openEdit();
  }, [entry, closePopup, openEdit]);

  const onHandleRemove = useCallback(() => {
    closePopup();
    closeEdit();
    openConfirm();
  }, [closePopup, openConfirm, closeEdit]);

  const onConfirmRemove = useCallback(() => onRemove(entry), [entry, onRemove]);
  const onHandleEdit = useCallback((e) => {
    if (
      e.target
      && (
        e.target.classList.contains('button')
        || e.target.classList.contains('popup')
        || e.target.parentNode.classList.contains('ListEntry__Actions')
        || e.target.parentNode.parentNode.classList.contains('ListEntry__Actions')
      )
    ) {
      e.preventDefault();
      return;
    }

    openEdit();
  }, [openEdit]);

  const onEditingEntryUpdate = useCallback((newEntry: any) => {
    setEditingEntry(newEntry);
  }, [setEditingEntry]);
  const onEditAddProject = useCallback((newProject: string): string => {
    const id = onAddProject(newProject);
    editingEntry.project = id;

    setEditingEntry(editingEntry);

    return id;
  }, [editingEntry, onAddProject]);

  const onSave = useCallback(() => {
    onEntryUpdate(editingEntry);
    closeEdit();
  }, [editingEntry, onEntryUpdate, closeEdit]);

  const duration = timeElapsed(start, end, false, false, round, roundAmount);
  const showDates = !isSameDay(start, end);

  const Buttons = (
    <Button.Group fluid>
      <Button
        icon="edit"
        basic
        color="grey"
        content="Edit entry"
        onClick={onHandleOpenEdit}
      />
      <Button
        basic
        icon="remove"
        onClick={onHandleRemove}
        color="red"
        content="Remove entry"
      />
    </Button.Group>
  );

  return (
    <div className="ListEntry" role="presentation" onClick={onHandleEdit}>
      {((enabledProjects && project) || enabledNotes) && (
        <div className="ListEntry__ProjectNotes">
          {enabledProjects && project && (
            <div className="ListEntry__Project">
              <Label color={colourValue(project.colour)}>
                {treeDisplayName(project)}
              </Label>
            </div>
          )}
          {enabledNotes && (
            <div className="ListEntry__Notes">
              {notes || <span className="ListEntry__NotesEmpty">(no notes)</span>}
            </div>
          )}
        </div>
      )}
      <div className="ListEntry__TimeDuration">
        <div className="ListEntry__Time">
          {showDates && <span className="ListEntry__DateValue">{formatDate(start)}</span>}
          <span className="ListEntry__TimeValue">{formatTime(start)}</span>
          <span className="ListEntry__TimeSeparator">→</span>
          {showDates && <span className="ListEntry__DateValue">{formatDate(end)}</span>}
          <span className="ListEntry__TimeValue">{formatTime(end)}</span>
        </div>
        <div className="ListEntry__Duration">
          {duration}
        </div>
        {!isMobile && (
          <div className="ListEntry__Actions">
            <Popup
              flowing
              open={popupOpen}
              onOpen={openPopup}
              onClose={closePopup}
              trigger={(
                <Button
                  style={{ opacity: 0.6 }}
                  icon="ellipsis vertical"
                  size="small"
                  circular
                  basic
                />
              )}
              on="click"
              position="left center"
              content={Buttons}
            />
          </div>
        )}
      </div>
      {isMobile && (
        <div className="ListEntry__Actions">
          {Buttons}
        </div>
      )}

      <Confirm
        open={confirmOpen}
        content="Are you sure you want to remove this entry?"
        confirmButton="Remove entry"
        size="mini"
        onCancel={closeConfirm}
        onConfirm={onConfirmRemove}
      />

      {editOpen && (
        <Modal
          open={editOpen}
          onClose={closeEdit}
          size="small"
        >
          <Modal.Content>
            <EditableEntry
              entry={editingEntry}
              enabledEndDate={enabledEndDate}
              enabledNotes={enabledNotes}
              enabledProjects={enabledProjects}
              onUpdate={onEditingEntryUpdate}
              onSave={onSave}
              onAddNewProject={onEditAddProject}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button
              icon="check"
              onClick={onSave}
              positive
              content="Save Changes"
            />
            <Button
              icon="close"
              onClick={closeEdit}
              content="Cancel"
            />
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
}

export default ListEntry;
