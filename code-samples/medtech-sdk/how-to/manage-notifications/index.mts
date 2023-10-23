import 'isomorphic-fetch'
import { NotificationFilter } from '@icure/medical-device-sdk'
import {
  initLocalStorage,
  initMedTechApi,
  output,
  initPatientMedTechApi,
} from '../../utils/index.mjs'
import { assert, expect } from 'chai'
import {
  Notification,
  NotificationTypeEnum,
} from '@icure/medical-device-sdk/src/models/Notification.js'

initLocalStorage()

const patientApi = await initPatientMedTechApi(true)
const api = await initMedTechApi(true)

const user = await api.userApi.getLoggedUser()
const hcp = await api.healthcareProfessionalApi.getHealthcareProfessional(user.healthcarePartyId)

//tech-doc: create a notification as patient
const accessNotification = await patientApi.notificationApi.createOrModifyNotification(
  new Notification({
    type: NotificationTypeEnum.KEY_PAIR_UPDATE,
  }),
  hcp.id,
)
//tech-doc: STOP HERE
output({ accessNotification })

expect(!!accessNotification).to.eq(true)
expect(accessNotification.type).to.eq(NotificationTypeEnum.KEY_PAIR_UPDATE)

//tech-doc: creates a notification, then retrieves it
const createdNotification = await patientApi.notificationApi.createOrModifyNotification(
  new Notification({
    type: NotificationTypeEnum.OTHER,
  }),
  hcp.id,
)

const retrievedNotification = await patientApi.notificationApi.getNotification(
  createdNotification.id,
)
//tech-doc: STOP HERE
output({ createdNotification, retrievedNotification })

expect(!!createdNotification).to.eq(true)
expect(!!retrievedNotification).to.eq(true)
expect(createdNotification.id).to.eq(retrievedNotification.id)

//tech-doc: creates after date filter
const startTimestamp = new Date(2022, 8, 27).getTime()

const afterDateFilter = await new NotificationFilter(api)
  .forDataOwner(user.healthcarePartyId)
  .afterDate(startTimestamp)
  .build()
//tech-doc: STOP HERE
output({ afterDateFilter })

expect(!!afterDateFilter).to.eq(true)

//tech-doc: gets the first page of results
const notificationsFirstPage = await api.notificationApi.filterNotifications(
  afterDateFilter,
  undefined,
  10,
)
//tech-doc: STOP HERE
output({ notificationsFirstPage })

expect(!!notificationsFirstPage).to.eq(true)
expect(notificationsFirstPage.rows.length).to.gt(0)
notificationsFirstPage.rows.forEach((notification) => {
  assert(notification.created! >= startTimestamp)
})

//tech-doc: gets the second page of results
const notificationsSecondPage = await api.notificationApi.filterNotifications(
  afterDateFilter,
  notificationsFirstPage.nextKeyPair.startKeyDocId,
  10,
)
//tech-doc: STOP HERE
output({ notificationsSecondPage })

expect(!!notificationsSecondPage).to.eq(true)
expect(notificationsSecondPage.rows.length).to.gt(0)
notificationsSecondPage.rows.forEach((notification) => {
  assert(notification.created! >= startTimestamp)
})

//tech-doc: gets the pending notifications
const pendingNotifications = await api.notificationApi.getPendingNotificationsAfter()
//tech-doc: STOP HERE
output({ pendingNotifications })

expect(!!pendingNotifications).to.eq(true)
expect(pendingNotifications.length).to.gt(0)
pendingNotifications.forEach((notification) => {
  assert(notification.status! === 'pending')
})

//tech-doc: modifies a notification
const newNotification = await api.notificationApi.createOrModifyNotification(
  new Notification({
    type: NotificationTypeEnum.KEY_PAIR_UPDATE,
  }),
  hcp.id,
)

const notificationToModify = new Notification({ ...newNotification, status: 'ongoing' })

const modifiedNotification = await api.notificationApi.createOrModifyNotification(
  notificationToModify,
  hcp.id,
)
//tech-doc: STOP HERE
output({ newNotification, modifiedNotification })

expect(!!newNotification).to.eq(true)
expect(!!modifiedNotification).to.eq(true)
expect(newNotification.id).to.eq(modifiedNotification.id)
expect(newNotification.status).to.eq('pending')
expect(modifiedNotification.status).to.eq('ongoing')

//tech-doc: updates notification status
const notificationToUpdate = await api.notificationApi.createOrModifyNotification(
  new Notification({
    type: NotificationTypeEnum.KEY_PAIR_UPDATE,
    status: 'pending',
  }),
  hcp.id,
)

const updatedNotification = await api.notificationApi.updateNotificationStatus(
  notificationToUpdate,
  'ongoing',
)
//tech-doc: STOP HERE
output({ notificationToUpdate, updatedNotification })

expect(!!notificationToUpdate).to.eq(true)
expect(!!updatedNotification).to.eq(true)
expect(notificationToUpdate.id).to.eq(updatedNotification.id)
expect(updatedNotification.status).to.eq('ongoing')

//tech-doc: deletes a notification
const notificationToDelete = await api.notificationApi.createOrModifyNotification(
  new Notification({
    type: NotificationTypeEnum.KEY_PAIR_UPDATE,
  }),
  hcp.id,
)

const deletedNotificationId = await api.notificationApi.deleteNotification(notificationToDelete.id)
//tech-doc: STOP HERE
output({ notificationToDelete, deletedNotificationId })

expect(!!notificationToDelete).to.eq(true)
expect(!!deletedNotificationId).to.eq(true)
expect(deletedNotificationId).to.eq(notificationToDelete.id)
