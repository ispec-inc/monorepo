// Code generated by MockGen. DO NOT EDIT.
// Source: pkg/domain/repository/invitation.go

// Package mock is a generated GoMock package.
package mock

import (
	gomock "github.com/golang/mock/gomock"
	apperror "github.com/ispec-inc/go-distributed-monolith/pkg/apperror"
	model "github.com/ispec-inc/go-distributed-monolith/pkg/domain/model"
	reflect "reflect"
)

// MockInvitation is a mock of Invitation interface.
type MockInvitation struct {
	ctrl     *gomock.Controller
	recorder *MockInvitationMockRecorder
}

// MockInvitationMockRecorder is the mock recorder for MockInvitation.
type MockInvitationMockRecorder struct {
	mock *MockInvitation
}

// NewMockInvitation creates a new mock instance.
func NewMockInvitation(ctrl *gomock.Controller) *MockInvitation {
	mock := &MockInvitation{ctrl: ctrl}
	mock.recorder = &MockInvitationMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockInvitation) EXPECT() *MockInvitationMockRecorder {
	return m.recorder
}

// Find mocks base method.
func (m *MockInvitation) Find(arg0 int64) (model.Invitation, apperror.Error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Find", arg0)
	ret0, _ := ret[0].(model.Invitation)
	ret1, _ := ret[1].(apperror.Error)
	return ret0, ret1
}

// Find indicates an expected call of Find.
func (mr *MockInvitationMockRecorder) Find(arg0 interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Find", reflect.TypeOf((*MockInvitation)(nil).Find), arg0)
}
